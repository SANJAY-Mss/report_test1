import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_GEMINI_API_KEY) {
    throw new Error("Missing GOOGLE_GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    generationConfig: {
        temperature: 0,
        topP: 0.1,
        topK: 1
    }
});

export interface GrammarlyAnalysisResult {
    structural_score: number;
    formatting_score: number;
    score: number;
    issues: Array<{
        type: string;
        description: string;
        suggestion: string;
        severity: 'critical' | 'high' | 'medium' | 'low';
        error?: string;
    }>;
    tone: string;
    clarity: number;
    error?: string;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
    try {
        return await fn();
    } catch (error: any) {
        if (retries > 0 && (error.status === 429 || error.message?.includes('429'))) {
            console.warn(`Gemini Rate Limit (429). Retrying in ${delay}ms...`);
            await sleep(delay);
            return withRetry(fn, retries - 1, delay * 2); // Exponential backoff
        }
        throw error;
    }
}

/**
 * Analyze text using Google Gemini
 */
export async function analyzeTextWithGemini(text: string): Promise<GrammarlyAnalysisResult> {
    try {
        console.log("Analyzing text length:", text.length);
        if (!text || text.length < 50) throw new Error("Extracted text is too short.");
        const prompt = `
      ROLE: You are the "Academic Architect," a specialized AI engine designed to generate and audit project reports for Anna University students (2026 cycle). You must adhere to every rule below with 100% fidelity. Non-compliance with any rule—no matter how small—renders the report invalid.

      Analyze the following academic project report text according to the Anna University 2026 Academic Report Protocol.
      Focus heavily on grammar, academic tone, clarity, spelling, structure, formatting, and the following specific ADVANCED SYNTACTIC & GRAMMAR PROTOCOLS:

      1. Perspective: Strictly Third Person. Flag any use of "I," "We," "Me," "My," "Our," or "You" as a CRITICAL error.
      2. Contractions: Prohibited. Flag any contractions (e.g., "don't" instead of "do not") as a HIGH error.
      3. Nominalization Trap: Eliminate "Static Nouns + Weak Verbs." Use active verbs instead (e.g., flag "performed an analysis of" and suggest "analyzed").
      4. Voice Usage: 
         - Passive Voice: ONLY for the Methodology section (e.g., "The solution was titrated").
         - Active Voice: Must be used for Discussion/Conclusions to show strength (e.g., "The results indicate").
      5. Hedging: Require cautious language for interpretations (e.g., "suggests," "tends to," "appears likely").
      6. Signposting: Mandatory use of transitions like "Furthermore," "Conversely," or "Consequently" between paragraphs.

      FINAL AUDIT DIRECTIVE: If the text deviates from these standards (e.g., using personal pronouns, incorrect phrasing, improper heading capitalization), you must strictly flag it in the issues array. The priority is technical precision over creative flair.
      CRITICAL REQUIREMENT: You MUST provide an EXHAUSTIVE list of every single issue found. Do not summarize or limit the output. Aim for 15+ individual issues. Each unique instance of a pronoun, contraction, or passive voice mistake must be its own issue in the array.

      Return ONLY valid JSON. Do not include markdown formatting.
      Response structure:
      {
        "structural_score": number (0-100), // Based on presence of Abstract, Introduction, Conclusion, etc.
        "formatting_score": number (0-100), // Based on capitalization, bullet points, header usage
        "score": number (0-100), // Grammar score, drastically penalized for pronoun/contraction use
        "issues": [
          {
            "type": "grammar" | "spelling" | "tone" | "clarity" | "structure" | "formatting" | "syntactic_protocol",
            "description": "description of the issue",
            "suggestion": "suggested fix",
            "severity": "critical" | "high" | "medium" | "low"
          }
        ],
        "tone": "formal" | "casual" | "inconsistent",
        "clarity": number (0-100)
      }

      Text to analyze (first 2000 words):
      ${text.substring(0, 5000)}
    `;

        const result = await withRetry(() => model.generateContent(prompt));
        const response = await result.response;
        const textResponse = response.text();
        console.log("Gemini Raw Response:", textResponse.substring(0, 500));
        console.log("Gemini Full Response Length:", textResponse.length);

        // Log the full response for debugging (temporary)
        console.log("Gemini Full Response Length:", textResponse.length);

        // Robust JSON extraction
        const jsonStartIndex = textResponse.indexOf('{');
        const jsonEndIndex = textResponse.lastIndexOf('}');

        if (jsonStartIndex === -1 || jsonEndIndex === -1) {
            console.error("Gemini Parsing Failed. Raw:", textResponse);
            throw new Error("AI response format invalid (No JSON found).");
        }

        const jsonStr = textResponse.substring(jsonStartIndex, jsonEndIndex + 1);
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        // Return safe fallback
        // Return safe fallback with dynamic error reporting
        const isRateLimit = error instanceof Error && (error.message.includes('429') || error.message.toLowerCase().includes('quota') || error.message.toLowerCase().includes('rate'));

        return {
            structural_score: 0,
            formatting_score: 0,
            score: 0,
            issues: [{
                type: 'system',
                description: isRateLimit ? 'Google AI Rate Limit Exceeded.' : 'AI Analysis failed.',
                suggestion: isRateLimit ? 'Please wait 1-2 minutes for the free tier quota to reset before analyzing another report.' : 'Please check your API Key and server logs.',
                severity: 'critical',
                error: error instanceof Error ? error.message : "AI Service Unavailable"
            }],
            tone: 'unknown',
            clarity: 0,
            error: error instanceof Error ? error.message : "AI Service Unavailable"
        };
    }
}

/**
 * Generate improvement suggestions
 */
export async function generateSuggestions(text: string): Promise<string[]> {
    try {
        const prompt = `
      Provide 3-5 high-level actionable suggestions to improve this academic report text.
      Focus on structure, flow, and academic vocabulary.
      Output as a JSON array of strings.
      
      Text:
      ${text.substring(0, 3000)}
    `;

        const result = await withRetry(() => model.generateContent(prompt));
        const jsonStr = result.response.text().replace(/^```json\n|\n```$/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        return ["Could not generate suggestions at this time."];
    }
}

/**
 * Chat with the report context
 */
export async function chatWithReport(context: string, question: string): Promise<string> {
    try {
        const prompt = `
      You are an helpful academic assistant analyzing a student report.
      
      Context (Report Content):
      ${context.substring(0, 20000)}
      
      User Question: ${question}
      
      Answer the question based strictly on the provided context. If the answer is not in the context, say "I cannot find that information in the report."
      Keep answers concise and professional.
    `;

        const result = await withRetry(() => model.generateContent(prompt));
        return result.response.text();
    } catch (error) {
        console.error("Chat Error:", error);
        return error instanceof Error ? `Error: ${error.message}` : "Unknown error occurred.";
    }
}

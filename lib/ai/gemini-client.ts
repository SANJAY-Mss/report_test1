import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_GEMINI_API_KEY) {
    throw new Error("Missing GOOGLE_GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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
      Analyze the following academic project report text according to Anna University standards.
      Focus on grammar, academic tone, clarity, spelling, structure, and formatting.
      
      Return ONLY valid JSON. Do not include markdown formatting.
      Response structure:
      {
        "structural_score": number (0-100), // Based on presence of Abstract, Introduction, Conclusion, etc.
        "formatting_score": number (0-100), // Based on capitalization, bullet points, header usage
        "score": number (0-100), // Grammar score
        "issues": [
          {
            "type": "grammar" | "spelling" | "tone" | "clarity" | "structure" | "formatting",
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
        return {
            structural_score: 0,
            formatting_score: 0,
            score: 0,
            issues: [{
                type: 'system',
                description: 'AI Analysis failed. Please check your API Key.',
                suggestion: 'Verify GOOGLE_GEMINI_API_KEY in .env',
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

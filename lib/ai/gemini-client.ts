import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_GEMINI_API_KEY) {
    throw new Error("Missing GOOGLE_GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    generationConfig: {
        temperature: 0.1,
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
        page?: string;
        error?: string;
    }>;
    tone: string;
    clarity: number;
    error?: string;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 10000): Promise<T> {
    try {
        return await fn();
    } catch (error: any) {
        if (retries > 0 && (error.status === 429 || error.message?.includes('429') || error.message?.toLowerCase().includes('quota') || error.message?.toLowerCase().includes('rate'))) {
            console.warn(`Gemini API Quota reached. Halting thread for ${delay / 1000} seconds before retry...`);
            await sleep(delay);
            return withRetry(fn, retries - 1, delay * 1.5); // Exponential backoff
        }
        throw error;
    }
}

/**
 * Analyze text using Google Gemini
 */
export async function analyzeTextWithGemini(
    text: string,
    fileBuffer?: Buffer,
    mimeType?: string
): Promise<GrammarlyAnalysisResult> {
    try {
        console.log("Analyzing text/document...");
        const prompt = `
      ROLE: You are the "Academic Architect," a specialized AI engine designed to generate and audit project reports for Anna University students (2026 cycle). You must adhere to every rule below with 100% fidelity.

      Analyze the accompanying document according to the Anna University 2026 Academic Report Protocol.
      Because we attached the raw PDF/Document, you MUST analyze visual alignment, structural order, page numbering, font properties, margins, and grammatical precision.

      1. PAGE NUMBERS: For EVERY issue you find, you MUST include the document page number where it occurs in the "page" field.
      2. STRUCTURE AUDIT: Verify the presence, formatting, and order of these exact sections:
          - Cover Page & Title Page (Title, Name, College Logo, Department, Month & Year)
          - Bonafide Certificate (Signed by Guide and HOD. Times New Roman, 14pt, Double Spaced)
          - Declaration (Signed by student)
          - Acknowledgement (Brief thank you)
          - Abstract (One page summary, 300-500 words)
          - Table of Contents
          - List of Tables
          - List of Figures
          - List of Symbols & Abbreviations 
      3. SYNTACTIC PROTOCOL: 
          - Strictly Third Person (Flag I, We, My, You as CRITICAL).
          - No Contractions.
          - Passive Voice exclusively for Methodology, Active Voice for Discussion/Conclusions.
          - Eliminate Nominalization (Static Nouns + Weak Verbs).
      4. FORMATTING PROTOCOL: 
          - Catch un-justified alignments in body text.
          - Verify font sizes (e.g., 14pt body text size approximations).
          - Catch spacing errors between paragraphs.

      CRITICAL REQUIREMENT: You MUST provide an EXHAUSTIVE list of every single issue found. Aim for 20+ issues if the document is flawed. Do not stop analyzing early. Read the entire document.

      Return ONLY valid JSON. Do not include markdown formatting.
      Response structure:
      {
        "structural_score": number (0-100),
        "formatting_score": number (0-100),
        "score": number (0-100),
        "issues": [
          {
            "type": "grammar" | "structure" | "formatting" | "syntactic_protocol" | "alignment" | "missing_section",
            "page": "page number (e.g. 1, 4)",
            "description": "description",
            "suggestion": "suggestion",
            "severity": "critical" | "high" | "medium" | "low"
          }
        ],
        "tone": "formal" | "casual",
        "clarity": number (0-100)
      }
    `;

        const promptParts: any[] = [{ text: prompt }];

        if (fileBuffer && mimeType === 'application/pdf') {
            promptParts.push({
                inlineData: {
                    data: fileBuffer.toString("base64"),
                    mimeType: "application/pdf"
                }
            });
        } else {
            promptParts.push({ text: `Text fallback: ${text.substring(0, 1500)}` });
        }

        const result = await withRetry(() => model.generateContent(promptParts));
        const response = await result.response;
        const textResponse = response.text();
        console.log("Gemini Raw Response length:", textResponse.length);

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
      Provide 3 - 5 high - level actionable suggestions to improve this academic report text.
      Focus on structure, flow, and academic vocabulary.
      Output as a JSON array of strings.

                Text:
                ${text.substring(0, 3000)}
                    `;

        const result = await withRetry(() => model.generateContent(prompt));
        const jsonStr = result.response.text().replace(/^```json\n |\n```$/g, '').trim();
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

                Context(Report Content):
                ${context.substring(0, 20000)}
      
      User Question: ${question}
      
      Answer the question based strictly on the provided context.If the answer is not in the context, say "I cannot find that information in the report."
      Keep answers concise and professional.
    `;

        const result = await withRetry(() => model.generateContent(prompt));
        return result.response.text();
    } catch (error) {
        console.error("Chat Error:", error);
        return error instanceof Error ? `Error: ${error.message}` : "Unknown error occurred.";
    }
}

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function main() {
  console.log("Testing Gemini Analysis (Standalone)...");

  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error("FAIL: Missing GOOGLE_GEMINI_API_KEY");
    return;
  }

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const sampleText = "This is a test academic report. It has an Introduction, Methods, and Conclusion. The grammar is mostly correct.";

  const prompt = `
      Analyze the following academic project report text according to Anna University standards.
      Focus on grammar, academic tone, clarity, spelling, structure, and formatting.
      
      Return a JSON response with the following structure:
      {
        "structural_score": number (0-100),
        "formatting_score": number (0-100),
        "score": number (0-100),
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

      Text:
      ${sampleText}
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();
    console.log("Raw Response:", textResponse);

    // Robust JSON extraction
    const jsonStartIndex = textResponse.indexOf('{');
    const jsonEndIndex = textResponse.lastIndexOf('}');

    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error("No JSON found in response");
    }

    const jsonStr = textResponse.substring(jsonStartIndex, jsonEndIndex + 1);
    const parsed = JSON.parse(jsonStr);

    console.log("Parsed JSON:", JSON.stringify(parsed, null, 2));

    if (parsed.structural_score > 0) {
      console.log("SUCCESS: Received valid scores.");
    } else {
      console.log("WARNING: Scores are 0?");
    }

  } catch (error) {
    console.error("CRITICAL ERROR:", error);
  }
}

main();

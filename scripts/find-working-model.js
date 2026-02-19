const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const candidates = [
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-1.0-pro",
    "gemini-pro",
    "gemini-flash-latest",
    "gemini-pro-latest",
    "gemini-1.5-flash-001",
    "gemini-1.5-pro-001",
    "gemini-2.0-flash-exp",
    "gemini-exp-1206"
];

async function testModel(modelName) {
    console.log(`Testing model: ${modelName}...`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log(`✅ SUCCESS: ${modelName} responded!`);
        console.log(`Response: ${response.text().substring(0, 50)}...`);
        return true;
    } catch (error) {
        console.log(`❌ FAILED: ${modelName}`);
        if (error.status === 404) console.log("   -> 404 Not Found");
        else if (error.status === 429) {
            console.log("   -> 429 Rate Limit");
            if (error.message.includes("limit: 0")) console.log("      -> Quota Limit is 0 (Unavailable)");
            else console.log("      -> Quota Busy (Available but busy)");
        }
        else console.log(`   -> Error: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log("Starting Model Availability Check...");
    for (const name of candidates) {
        const working = await testModel(name);
        if (working) {
            console.log(`\n🎉 FOUND WORKING MODEL: ${name}`);
            console.log("Please update your code to use this model.");
            break;
        }
        await new Promise(r => setTimeout(r, 1000)); // Delay to avoid spamming
    }
    console.log("\nCheck Complete.");
}

main();

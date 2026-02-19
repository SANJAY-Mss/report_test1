const https = require('https');
require('dotenv').config();

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log("Writing models to models_list.json");
            require('fs').writeFileSync('models_list.json', JSON.stringify(json, null, 2));
        } catch (e) {
            console.error("Error parsing JSON:", e);
            console.log("Raw Data:", data);
        }
    });
}).on('error', (err) => {
    console.error("Error fetching models:", err.message);
});

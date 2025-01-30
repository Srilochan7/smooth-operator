export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { description } = req.body;
    const API_KEYS = [
        process.env.GEMINI_API_KEY,
        process.env.GEMINI_API_KEY2,
        process.env.GEMINI_API_KEY3
    ];

    const prompt = "Create a single clever pickup line that directly references the specific traits, interests, or features mentioned in the description. Use wordplay or puns related to their hobbies, characteristics, or what they love. Keep it short, playful, and add 2-3 relevant emojis. Focus only on the details provided in the description. Response should be just the pickup line without any explanations or extra text.";

    let attempts = 0;
    let currentKeyIndex = 0;

    while (attempts < API_KEYS.length) {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEYS[currentKeyIndex]}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ text: `${prompt}\n${description}` }]
                        }]
                    })
                }
            );

            if (response.status === 403) {
                currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
                attempts++;
                continue;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.candidates && data.candidates.length > 0) {
                return res.status(200).json({ text: data.candidates[0].content.parts[0].text });
            } else {
                throw new Error('No text was generated.');
            }
        } catch (error) {
            console.error('Error generating text:', error);
            attempts++;
        }
    }

    return res.status(500).json({ error: 'All API keys have been exhausted. Please try again later.' });
}

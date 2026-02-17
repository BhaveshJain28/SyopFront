import { GoogleGenerativeAI } from "@google/generative-ai"

// Helper function to retry with exponential backoff
const retryWithBackoff = async (fn, maxRetries = 3, delayMs = 1000) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            // Check if it's a quota/rate limit error (429)
            if ((error.status === 429 || error.message.includes("quota") || error.message.includes("Too Many Requests")) && i < maxRetries - 1) {
                const waitTime = Math.min(delayMs * Math.pow(2, i), 30000); // Max 30 seconds
                console.log(`Quota limit hit. Retrying in ${waitTime}ms... (Attempt ${i + 1}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            } else {
                throw error;
            }
        }
    }
};

export const geminiAPIHandler = async (req, res) => {
    try {
        const postfix_prompt = "based on the symptoms guess the disease and give me the output for this in the form of json file in which following keys are must there : 1.primary condition 2secondry conditions (in array up to 2 to 3 conations) 3.percent match of primary condition 4.percent match of all secondary condition(of all) 5.Risk Assessment (low, medium, high) 6.urgency - (true or false) 7.recommendation for you (array of 5)";
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const { symptoms } = req.body;
        
        if (!symptoms) {
            return res.status(400).json({ error: 'Symptoms are required' });
        }
        
        const prompt = `${symptoms} ${postfix_prompt}`;

        // Generate content with retry logic
        const generateContent = async () => {
            const model = genAI.getGenerativeModel({
                model: 'gemini-2.0-flash-lite'
            });
            
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        };
        
        const text = await retryWithBackoff(generateContent, 3, 2000);

        res.json({
            generatedText: text
        });
    } catch (error) {
        console.error("Error generating content:", error.message);
        
        // Handle specific error cases
        if (error.status === 404) {
            return res.status(400).json({ error: 'AI Model not available. Check your API key.' });
        }
        
        if (error.status === 429 || error.message.includes("quota")) {
            return res.status(503).json({ 
                error: 'API quota exceeded. Please try again in a moment.',
                retryAfter: 60
            });
        }
        
        if (error.message.includes("leaked")) {
            return res.status(401).json({ error: 'API key is invalid. Please check your configuration.' });
        }
        
        res.status(500).json({ error: 'Failed to generate content', details: error.message });
    }
};
import { geminiModel } from "../config/gemini.config.js"

export const generateAIResponse = async (prompt) => {
    try {
        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (err) {
        console.error("Gemini API Error: ", error);
        return "Gemini API Error 입니다.";
    }
}
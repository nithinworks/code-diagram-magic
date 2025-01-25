import { GoogleGenerativeAI } from "@google/generative-ai";

const generateUMLFromCode = async (code: string): Promise<string> => {
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a PlantUML diagram for the following code. Only return the PlantUML code, nothing else. The code is:\n\n${code}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract PlantUML code from response
    return text.replace(/```plantuml|```/g, '').trim();
  } catch (error) {
    console.error('Error generating UML:', error);
    throw new Error('Failed to generate UML diagram');
  }
}

export { generateUMLFromCode };
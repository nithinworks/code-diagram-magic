import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateMockUMLDiagram = async (code: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Generate a UML class diagram representation for the following code. 
      Format the output as a text-based UML diagram using ASCII characters.
      Include class names, attributes, methods, and relationships.
      Here's the code:

      ${code}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      diagram: text
    };
  } catch (error) {
    console.error("Error generating UML diagram:", error);
    return {
      success: false,
      error: "Failed to generate diagram. Please try again."
    };
  }
};
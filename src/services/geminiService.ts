import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateMockUMLDiagram = async (code: string) => {
  try {
    // For now, return a mock response
    return {
      success: true,
      diagram: "Mock UML Diagram for code:\n" + code.substring(0, 100) + "..."
    };
  } catch (error) {
    console.error("Error generating UML diagram:", error);
    return {
      success: false,
      error: "Failed to generate diagram"
    };
  }
};
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/integrations/supabase/client";

export const generateMockUMLDiagram = async (code: string) => {
  try {
    // Get the API key from Supabase
    const { data: { value: apiKey }, error } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'GEMINI_API_KEY')
      .single();

    if (error || !apiKey) {
      console.error("Error fetching API key:", error);
      return {
        success: false,
        error: "Failed to fetch API key. Please ensure it's properly configured."
      };
    }

    // Initialize Gemini with the API key
    const genAI = new GoogleGenerativeAI(apiKey);
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
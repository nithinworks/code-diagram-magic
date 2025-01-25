import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const generateMockUMLDiagram = async (code: string) => {
  try {
    // Get the API key from Supabase
    const { data, error } = await supabase
      .from('secrets')
      .select('value')
      .eq('name', 'GEMINI_API_KEY')
      .maybeSingle();

    if (error) {
      console.error("Database error fetching API key:", error);
      throw new Error("Failed to fetch API key from database");
    }

    if (!data) {
      console.error("No API key found in database");
      throw new Error("Gemini API key not found in database. Please add it in the secrets configuration.");
    }

    if (!data.value) {
      console.error("API key value is empty");
      throw new Error("Gemini API key value is empty. Please check the configuration.");
    }

    console.log("Successfully retrieved API key from database");

    // Initialize Gemini with the API key
    const genAI = new GoogleGenerativeAI(data.value);
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
    console.error("Error in generateMockUMLDiagram:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate diagram";
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
    return {
      success: false,
      error: errorMessage
    };
  }
};
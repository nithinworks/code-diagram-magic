import { useEffect, useState } from "react";
import { encode } from "plantuml-encoder";
import { generateUMLFromCode } from "../services/geminiService";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface DiagramViewerProps {
  code: string;
}

const DiagramViewer = ({ code }: DiagramViewerProps) => {
  const [plantUML, setPlantUML] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateDiagram = async () => {
    if (!code) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const umlCode = await generateUMLFromCode(code);
      setPlantUML(umlCode);
    } catch (err) {
      setError('Failed to generate diagram. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      generateDiagram();
    }
  }, [code]);

  const getPlantUMLUrl = (umlCode: string) => {
    const encoded = encode(umlCode);
    return `https://www.plantuml.com/plantuml/svg/${encoded}`;
  };

  if (!code) {
    return (
      <div className="h-full min-h-[400px] bg-muted/10 rounded flex items-center justify-center">
        <p className="text-muted-foreground">Enter code to generate diagram</p>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[400px] bg-muted/10 rounded flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-sm font-medium">UML Diagram</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={generateDiagram}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Regenerate"
          )}
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {error ? (
          <div className="text-destructive text-center mt-4">{error}</div>
        ) : isLoading ? (
          <div className="flex items-center justify-center h-full">
            <ReloadIcon className="h-6 w-6 animate-spin" />
          </div>
        ) : plantUML ? (
          <img
            src={getPlantUMLUrl(plantUML)}
            alt="UML Diagram"
            className="max-w-full h-auto mx-auto"
          />
        ) : (
          <div className="text-center mt-4">
            <p className="text-muted-foreground">No diagram generated yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagramViewer;
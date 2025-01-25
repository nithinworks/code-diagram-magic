import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import DiagramViewer from "../components/DiagramViewer";
import AnnotationsPanel from "../components/AnnotationsPanel";
import { generateMockUMLDiagram } from "../services/geminiService";
import { useToast } from "../hooks/use-toast";

const Index = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [diagram, setDiagram] = useState<string>();
  const [annotations, setAnnotations] = useState<string[]>([]);
  const { toast } = useToast();

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleGenerateDiagram = async () => {
    if (!code.trim()) {
      toast({
        title: "No code to analyze",
        description: "Please enter some code first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generateMockUMLDiagram(code);
      if (result.success) {
        setDiagram(result.diagram);
        setAnnotations(["Class diagram generated", "Relationships identified"]);
        toast({
          title: "Success",
          description: "UML diagram generated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate diagram",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4">
        <h1 className="text-2xl font-bold">Code-to-Diagram Visualizer</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-8rem)]">
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
            <CodeEditor 
              code={code} 
              onChange={handleCodeChange} 
              onSubmit={handleGenerateDiagram}
            />
          </div>
          <div className="lg:col-span-1 border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Diagram</h2>
            <DiagramViewer 
              code={code} 
              loading={loading}
              diagram={diagram}
            />
          </div>
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">AI Annotations</h2>
            <AnnotationsPanel annotations={annotations} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
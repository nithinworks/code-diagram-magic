import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import DiagramViewer from "../components/DiagramViewer";
import AnnotationsPanel from "../components/AnnotationsPanel";

const Index = () => {
  const [code, setCode] = useState("");
  const [annotations, setAnnotations] = useState<string[]>([]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    // Mock annotations - in production this would come from Gemini API
    setAnnotations(["Class structure detected", "Inheritance relationship found"]);
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
            <CodeEditor code={code} onChange={handleCodeChange} />
          </div>
          <div className="lg:col-span-1 border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Diagram</h2>
            <DiagramViewer code={code} />
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
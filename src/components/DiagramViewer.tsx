interface DiagramViewerProps {
  code: string;
}

const DiagramViewer = ({ code }: DiagramViewerProps) => {
  // Mock diagram - in production this would generate a real UML diagram
  return (
    <div className="h-full min-h-[400px] bg-muted/10 rounded flex items-center justify-center">
      {code ? (
        <div className="text-center">
          <p className="text-muted-foreground">Mock UML Diagram</p>
          <p className="text-sm text-muted-foreground mt-2">
            (Will be generated from code using Gemini API)
          </p>
        </div>
      ) : (
        <p className="text-muted-foreground">Enter code to generate diagram</p>
      )}
    </div>
  );
};

export default DiagramViewer;
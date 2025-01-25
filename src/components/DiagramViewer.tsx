interface DiagramViewerProps {
  code: string;
  loading?: boolean;
  diagram?: string;
}

const DiagramViewer = ({ code, loading, diagram }: DiagramViewerProps) => {
  if (loading) {
    return (
      <div className="h-full min-h-[400px] bg-muted/10 rounded flex items-center justify-center">
        <p className="text-muted-foreground">Generating diagram...</p>
      </div>
    );
  }

  if (diagram) {
    return (
      <div className="h-full min-h-[400px] bg-muted/10 rounded flex items-center justify-center p-4">
        <pre className="text-sm whitespace-pre-wrap">{diagram}</pre>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[400px] bg-muted/10 rounded flex items-center justify-center">
      {code ? (
        <div className="text-center">
          <p className="text-muted-foreground">Click Generate to create UML diagram</p>
        </div>
      ) : (
        <p className="text-muted-foreground">Enter code to generate diagram</p>
      )}
    </div>
  );
};

export default DiagramViewer;
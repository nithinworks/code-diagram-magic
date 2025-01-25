interface AnnotationsPanelProps {
  annotations: string[];
}

const AnnotationsPanel = ({ annotations }: AnnotationsPanelProps) => {
  return (
    <div className="h-full min-h-[400px]">
      {annotations.length > 0 ? (
        <ul className="space-y-2">
          {annotations.map((annotation, index) => (
            <li 
              key={index}
              className="p-3 bg-muted/10 rounded-lg text-sm text-muted-foreground"
            >
              {annotation}
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No annotations yet
        </div>
      )}
    </div>
  );
};

export default AnnotationsPanel;
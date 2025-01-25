import { useEffect, useRef } from "react";
import { EditorView, lineNumbers, keymap } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  foldGutter,
  indentOnInput,
} from "@codemirror/language";
import { Button } from "./ui/button";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onSubmit: () => void;
}

const CodeEditor = ({ code, onChange, onSubmit }: CodeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView>();

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: code,
      extensions: [
        lineNumbers(),
        history(),
        indentOnInput(),
        bracketMatching(),
        foldGutter(),
        syntaxHighlighting(defaultHighlightStyle),
        javascript(),
        keymap.of(defaultKeymap),
        keymap.of(historyKeymap),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    editorViewRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div className="space-y-4">
      <div 
        ref={editorRef} 
        className="h-full min-h-[400px] border rounded bg-background text-foreground overflow-auto"
      />
      <Button 
        onClick={onSubmit}
        className="w-full"
      >
        Generate UML Diagram
      </Button>
    </div>
  );
};

export default CodeEditor;
import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";
import { EditorState } from "@codemirror/state";

const geistMonoTheme = EditorView.theme({
  "&": {
    fontFamily: '"Geist Mono", monospace',
    fontSize: "13px",
    height: "100%",
    backgroundColor: "hsl(0 0% 100%)",
  },
  ".cm-scroller": { overflow: "auto", fontFamily: "inherit" },
  ".cm-content": { padding: "16px", caretColor: "hsl(0 0% 9%)" },
  ".cm-line": { color: "hsl(0 0% 9%)", lineHeight: "1.7" },
  ".cm-gutters": {
    backgroundColor: "hsl(0 0% 98%)",
    borderRight: "1px solid hsl(0 0% 90%)",
    color: "hsl(0 0% 64%)",
    fontFamily: '"Geist Mono", monospace',
    fontSize: "12px",
    paddingRight: "12px",
  },
  ".cm-activeLineGutter": { backgroundColor: "hsl(0 0% 96%)" },
  ".cm-activeLine": { backgroundColor: "hsl(0 0% 98%)" },
  ".cm-cursor": { borderLeftColor: "hsl(0 0% 9%)", borderLeftWidth: "2px" },
  ".cm-selectionBackground": { backgroundColor: "hsl(0 0% 90%) !important" },
  ".cm-focused .cm-selectionBackground": { backgroundColor: "hsl(0 0% 83%) !important" },
  "&.cm-focused": { outline: "none" },
});

export interface CodeEditorHandle {
  getValue: () => string;
  setValue: (code: string) => void;
}

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(
  function CodeEditor({ value = "", onChange, className = "" }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    useImperativeHandle(ref, () => ({
      getValue: () => viewRef.current?.state.doc.toString() ?? "",
      setValue: (code: string) => {
        if (!viewRef.current) return;
        viewRef.current.dispatch({
          changes: { from: 0, to: viewRef.current.state.doc.length, insert: code },
        });
      },
    }));

    useEffect(() => {
      if (!containerRef.current) return;
      const state = EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          python(),
          geistMonoTheme,
          EditorView.lineWrapping,
          EditorView.updateListener.of((u) => {
            if (u.docChanged) onChange?.(u.state.doc.toString());
          }),
        ],
      });
      viewRef.current = new EditorView({ state, parent: containerRef.current });
      return () => viewRef.current?.destroy();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div ref={containerRef} className={`h-full ${className}`} />;
  }
);

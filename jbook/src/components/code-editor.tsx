// import './code-editor.css';
import MonacoEditor from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import prettier from "prettier";
// and to parse advance javacript code
import parser from "prettier/parser-babel";

// TODO: JSX highlighting
// import Highlighter, { JSXTypes } from "monaco-jsx-highlighter";
// import { parse } from "@babel/parser";
// import traverse from "@babel/traverse";

type StandaloneCodeEditor = Monaco.editor.IStandaloneCodeEditor;

interface ICodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<StandaloneCodeEditor>();
  const [err, setErr] = useState("");

  const onEditorDidMount = (editor: StandaloneCodeEditor, monaco: any) => {
    editorRef.current = editor;
    // TODO: tabSize is not working
    editorRef.current.getModel()?.updateOptions({ tabSize: 2 });

    // TODO: JSX highlighting
  };

  const handleEditorChange = (
    value: string | undefined,
    event: Monaco.editor.IModelContentChangedEvent
  ): void => {
    if (value) {
      onChange(value);
    }
  };

  const onFormatClick = () => {
    // get current value from editor
    if (editorRef.current) {
        const unformatted = editorRef.current.getModel()?.getValue() || "";

        // format that value
        const formatted = prettier
          .format(unformatted, {
            parser: "babel", // treat this as javascript
            plugins: [parser], // use this parser
            useTabs: false, // don't format with tabs
            semi: true, // add semi colons at the end of expressions and declarations if missing
            singleQuote: true, // use single quotes for all strings
          })
          .replace(/\n$/, "");
  
        // set the formatted value back in the editor
        editorRef.current.setValue(formatted);
    }
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is small"
        onClick={onFormatClick}
      >
        {err !== "" ? "Error" : "Format"}
      </button>
      <MonacoEditor
        onMount={onEditorDidMount}
        onChange={handleEditorChange}
        value={initialValue} // initial value
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;

import './text-editor.css';
import { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";


const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("**Hello world!!!**");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current && 
        event.target &&
        ref.current.contains(event.target as Node)
        ) {
        return;
      }
      setEditing(false);
    }
    document.addEventListener('click', listener, {capture: true});

    return () => {
      document.removeEventListener('click', listener, { capture: true})
    }

  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref} >
        <MDEditor
          value={value}
          onChange={(val) => setValue(val || '')}  // or just setValue
        />
      </div>
    )
  } 

  return (
    <div className="text-editor card" onClick={() => {setEditing(true)}}>
      <div className="card-content">
        <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
      </div>
    </div>
  );

};

export default TextEditor;
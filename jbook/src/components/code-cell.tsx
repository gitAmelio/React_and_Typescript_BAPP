import { useEffect, useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from '../bundler';
import Resizable from "./resizable";

const CodeCell = () => {
  const [userCode, setUserCode] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState('');
  

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { code, err } = await bundle(userCode)
      setCode(code);
      setErr(err);
    }, 1000);

    // when userCode change clear timer
    return () => {
      clearTimeout(timer);
    }
  }, [userCode]);

  return (
    <Resizable direction="vertical">
      <div className="flex-container"  >
        <Resizable direction="horizontal" >
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setUserCode(value)}
          />
        </Resizable>
        {/* <div>
          <button onClick={onSubmitClick}>Submit</button>
        </div> */}
        <Preview code={code} err={err}/>
      </div>
    </Resizable>
  );
};

export default CodeCell;

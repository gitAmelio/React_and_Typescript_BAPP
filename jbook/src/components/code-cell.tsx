import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from '../bundler';

const CodeCell = () => {
  const [userCode, setUserCode] = useState("");
  const [code, setCode] = useState("");

  const onSubmitClick = async () => {
    const output = await bundle(userCode)

    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setUserCode(value)}
      />
      <div>
        <button onClick={onSubmitClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;

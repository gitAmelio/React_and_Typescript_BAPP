import { useEffect, useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import { BundleService } from "../bundler";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState('');
  const { updateCell } = useActions();
  
  useEffect(() => {
    const timer = setTimeout(async  () => {
      try {
        const { code, err } = await BundleService.build(cell.content)
        setCode(code);
        setErr(err);
      } catch (error) {
        
      }
    }, 1000);

    // when userCode change clear timer
    return () => {
      clearTimeout(timer);
    }
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div className="flex-container"  >
        <Resizable direction="horizontal" >
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} err={err}/>
      </div>
    </Resizable>
  );
};

export default CodeCell;

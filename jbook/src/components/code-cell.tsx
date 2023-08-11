import './code-cell.css';
import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selected";


interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  // const [code, setCode] = useState("");
  // const [err, setErr] = useState('');
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async  () => {
      try {
        // const { code, err } = await BundleService.build(cell.content)
        // setCode(code);
        // setErr(err);
        createBundle(cell.id, cell.content)
      } catch (error) {
        
      }
    }, 1000);

    // when userCode change clear timer
    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id]);

  return (
    <Resizable direction="vertical">
      <div className="flex-container"  >
        <Resizable direction="horizontal" >
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {
            !bundle || bundle.loading
              ? (
                  <div className="progress-cover">
                    <progress className="progress is-small is-primary" max="100">
                      Loading
                    </progress>
                  </div>
              ) 
              : <Preview code={bundle.code} err={bundle.err}/>
          }
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;

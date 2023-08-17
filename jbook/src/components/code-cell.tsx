import './code-cell.css';
import { createSelector } from 'reselect'
import { Cell, RootState } from "../state";
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selected";
import { useSelectCumulativeCode, useSelectBundleItem } from '../hooks/use-typed-selected';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useSelectBundleItem(cell.id);
  const cumulativeCode = useSelectCumulativeCode(cell.id)

  // console.log('cumulativeCode: ',cumulativeCode);
  // console.log('renders');

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async  () => {
      try {
        createBundle(cell.id, cumulativeCode);
      } catch (error) {
        
      }
    }, 1000);

    // when user code change clear timer
    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id]);

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

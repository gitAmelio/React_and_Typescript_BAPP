import './cell-list-item.css';
import { Cell } from "../state";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
import ActionBar from "./action-bar";

interface CellListItemsProps {
  cell: Cell
}

const CellListItem: React.FC<CellListItemsProps> = ({cell}) => {

  let item: JSX.Element;
  if(cell.type === 'code') {
    item = <>
      <div className="action-bar-wrapper">
        <ActionBar id={cell.id}/>
      </div>
      <CodeCell cell={cell}/>
    
    </>
  } else {
    item = <>
      <ActionBar id={cell.id}/>
      <TextEditor cell={cell}/>
    </>
  }

  return (
    <div className="cell-list-item">
      {item}
    </div>
  )
};

export default CellListItem; 
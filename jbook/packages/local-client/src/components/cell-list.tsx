import './cell-list.css';
import { Fragment, useEffect } from "react";
import { useSelectOrderedCells } from '../hooks/use-typed-selected';
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { useActions } from '../hooks/use-actions';

const CellList: React.FC = () => {
  const cellsMemoized = useSelectOrderedCells();

  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  },  []);

  useEffect(() => {
    saveCells();
  }, [JSON.stringify(cellsMemoized)]);

  const renderedCells = cellsMemoized.map((cell)=>{
    return <Fragment key={cell.id}>
      <CellListItem  cell={cell}/>
      <AddCell prevCellId={cell.id}/>
    </Fragment> 
  });

  return <div className="cell-list">
    <AddCell forceVisible={cellsMemoized.length === 0} prevCellId={null}/>
    {renderedCells}
  </div>;
  
};

export default CellList;
import { useSelector } from 'react-redux'
import { Fragment } from "react";
// import { useTypedSelector } from "../hooks/use-typed-selected";
import { selectedCellsMemoized } from "../hooks/selected-cells-memoized";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () => {

  const cellsMemoized = useSelector(selectedCellsMemoized);
   
  // const cells = useTypedSelector(({ cells: {order, data} }) => {
  //   return order.map(id=> data[id])
  // })

 const renderedCells = cellsMemoized.map((cell)=>{
    return <Fragment key={cell.id}>
      <CellListItem  cell={cell}/>
      <AddCell prevCellId={cell.id}/>
    </Fragment> 
  });

  return <div>
    <AddCell forceVisible={cellsMemoized.length === 0} prevCellId={null}/>
    {renderedCells}
  </div>;
  
};

export default CellList;
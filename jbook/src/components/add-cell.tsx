import AddCellButton from './add-cell-button';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <AddCellButton previousCellId={prevCellId} cellType='code'/>
        <AddCellButton previousCellId={prevCellId} cellType='text'/>
      </div>
      <div className="divider"></div>
    </div> 
  )
}

export default AddCell;
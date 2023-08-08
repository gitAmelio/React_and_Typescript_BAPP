import './add-cell.css';
import { useActions } from "../hooks/use-actions"
import { CellTypes } from "../state"

interface AddCellButtonProp {
  cellType: CellTypes;
  previousCellId: string | null;
}

const AddCellButton: React.FC<AddCellButtonProp> = ({previousCellId, cellType}) => {
  const { insertCellAfter } = useActions();

  return (
    <button className="button is-rounded is-primary is-small" 
            onClick={() => insertCellAfter(previousCellId, 'code')}>
      <span className="icon is-small">
        <i className="fas fa-plus" />
      </span>
      <span>{previousCellId === 'text' ? 'Text' : 'Code'}</span>
    </button>
  )
}

export default AddCellButton;
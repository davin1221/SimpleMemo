import MemoItem from "./MemoItem";

const MemoBoard = ({onEdit, onDelete, memoBoard}) => {
    return <div className="memoBoard">

        <div className="memoBoardArea">
            {memoBoard.map((it)=>(
                <MemoItem key={it.id} {...it} onDelete={onDelete} onEdit={onEdit}/>
            ))}
        </div>
    </div>
}

export default MemoBoard;
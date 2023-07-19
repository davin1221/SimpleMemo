import MemoItem from "./MemoItem";

const MemoBoard = ({onDelete, memoBoard}) => {
    return <div className="memoBoard">
        
        <h4>총 {memoBoard.length}개의 메모</h4>
        <div className="memoBoardArea">
            {memoBoard.map((it)=>(
                <MemoItem key={it.id} {...it} onDelete={onDelete}/>
            ))}
        </div>
    </div>
}

export default MemoBoard;
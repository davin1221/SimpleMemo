import { useContext } from "react";
import MemoItem from "./MemoItem";
import { MemoStateContext } from "./App";

const MemoBoard = (/*{onEdit, onDelete  ,memoBoard }*/) => {

    const memoBoard = useContext(MemoStateContext);

    return <div className="memoBoard">

        <div className="memoBoardArea">
            {memoBoard.map((it)=>(
                <MemoItem key={it.id} {...it}/*onDelete={onDelete} onEdit={onEdit}*//>
            ))}
        </div>
    </div>
}

export default MemoBoard;
const MemoItem = ({onDelete, id, subject, title, content, writtenDate}) => {



    const handleDelete = () => {
        if (window.confirm(`'${title}' 메모를 삭제하시겠습니까?`)) onDelete(id);
    }

    return <div className="memoItem">
        
        <div>
            <button onClick={handleDelete}>&times;</button>
        </div> 

        <div>
            <div>
                <span>{title}</span>
                <span>[{subject}]</span>
            </div>
            
            <span>{new Date(writtenDate).toLocaleString()}</span>
        </div>

        <div>
            {content} <br/>
        </div>

        <div>
            <button>수정</button>    
        </div>
    </div>
}

export default MemoItem;

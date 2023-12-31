import React, { useContext, useEffect, useRef, useState } from "react";
import { MemoDispatchContext } from "./App";

const MemoItem = ({/*onEdit, onDelete,*/ id, subject, title, content, writtenDate}) => {

    // onDelete, onEdit 받아오기 
    const { onDelete, onEdit } = useContext(MemoDispatchContext);

    // 현재 내용이 수정중인지 아닌지 값을 보관할 State
    const [isEdit, setIsEdit] = useState(false);

    // 호출되면 기존 isEdit이 가지고 있던 값을 반대로 set (버튼 클릭 시 호출)
    const toggleIsEdit = () => setIsEdit(!isEdit);

    // 수정된 내용의 State (기초값으로 원래의 content 설정)
    const [editedContent, setEditedContent] = useState(content);

    // 수정 취소 버튼을 누르면 수정중이던 내용이 초기화되는 함수 
    const handleCancledEdit = () => {
        setIsEdit(false);
        setEditedContent(content);
    }

    // 수정 form focus 요소  
    const editedContentInput = useRef();

    // 수정 완료 시 App.js로 data를 보내는 event
    const handleEdit = () =>{

        if(editedContent.length < 5) {
            editedContentInput.current.focus();
            return;
        }

        if(window.confirm(`'${title}' 메모를 수정하시겠습니까?`)) {
            onEdit(id, editedContent);
            toggleIsEdit();
        } 
    }

    // 삭제 시 App.js로 data를 보내는 event
    const handleDelete = () => {
        if (window.confirm(`'${title}' 메모를 삭제하시겠습니까?`)) onDelete(id);
    }

    // 메모 배경 색 설정
    const memoBackColor = () => {
        if(subject === "기타") return "#ffff86"
        if(subject === "쇼핑") return  "skyblue"
        if(subject === "할 일") return "pink"
        if(subject === "공부") return "rgb(207, 238, 160)"
    }


    return <div className="memoItem" style={{ backgroundColor: memoBackColor() }}>
        
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
            {/* isEdit이 true일 경우 수정 form이 나옴 */}
            {isEdit ? 
                <>
                    <textarea 
                        className="editContent"
                        value={editedContent}
                        ref={editedContentInput}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                </>
                 : 
                <>{content}</>}
            
        </div>

        <div>
            {/* isEdit이 ture일 경우 수정취소/수정완료 버튼 */}
            {isEdit ? 
                <>
                    <button onClick={handleCancledEdit}>수정 취소</button>
                    <button onClick={handleEdit}>수정 완료</button>
                </>
                :
                <>
                    <button onClick={toggleIsEdit}>수정</button>    
                </>
            }
            
        </div>
    </div>
}

export default React.memo(MemoItem);

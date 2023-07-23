import React, { useContext, useRef, useState } from "react";
import { MemoDispatchContext } from "./App";





const MemoEditor = () => {

    // onCreate props 가져오기 
    const { onCreate } = useContext(MemoDispatchContext);

    /** focus할 대상 및 함수 */
    const titleInput = useRef();
    const contentInput = useRef();


    /** 메모 내용 State */
    const [state, setState] = useState({
        subject : "기타",
        title : "",
        content : "",
    });

    /**
     * 입력 폼의 내용이 변하면 발생하는 함수 
     * @param {*} e - 이벤트 대상
     */
    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    /**
     * 작성 버튼 누르면 실행될 함수 
     * @returns 
     */
    const handleSubmit = () => {

        if(state.title.length == 0) {
            titleInput.current.focus();
            return
        }

        if(state.content.length < 5) {
            contentInput.current.focus();
            return
        }

        onCreate(state.subject, state.title, state.content);

        alert("메모 작성 성공!")

        // 입력 폼 초기화 
        setState({
            subject: "기타",
            title: "",
            content: "",
        });

    }




    return <div className="MemoEditor">
        
        {/* 주제, 제목 */}
        <div>
            <select
                name="subject"
                value={state.subject}
                onChange={handleChangeState}
                >
                <option value={"기타"}>기타</option>
                <option value={"쇼핑"}>쇼핑</option>
                <option value={"할 일"}>할 일</option>
                <option value={"공부"}>공부</option>
            </select>

            <input 
                name="title"
                placeholder="제목을 입력하세요."
                value={state.title}
                onChange={handleChangeState}
                ref={titleInput}
            />
        </div>

        {/* 내용 */}
        <div>
            <textarea 
                name="content"
                placeholder="내용을 입력하세요."
                value={state.content}
                onChange={handleChangeState}
                ref={contentInput}
            />
        </div>

        {/* 작성 버튼 */}
        <div>
            <button onClick={handleSubmit}>작성</button>
        </div>
            
    </div>
}

export default React.memo(MemoEditor);
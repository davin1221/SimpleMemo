import { useState } from "react";





const MemoEditor = () => {


    /** 메모 내용 State */
    const [state, setState] = useState({
        subject : "",
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

    const handleSubmit = () => {

       
        // 만약 주제가 선택되지 않았다면 기본값을 '기타'가 설정됨
        if(state.subject === '') {

            console.log("선택노노")
            setState({
                ...state,
                subject : "기타"
            })
        }

        console.log(state)
    }




    return <div className="MemoEditor">
        
        {/* 주제, 제목 */}
        <div>
            <select
                name="subject"
                value={state.subject}
                onChange={handleChangeState}>
                <option>기타</option>
                <option>쇼핑</option>
                <option>할 일</option>
                <option>공부</option>
            </select>

            <input 
                name="title"
                placeholder="제목을 입력하세요."
                value={state.title}
                onChange={handleChangeState}
            />
        </div>

        {/* 내용 */}
        <div>
            <textarea 
                name="content"
                placeholder="내용을 입력하세요."
                value={state.content}
                onChange={handleChangeState}
            />
        </div>

        {/* 작성 버튼 */}
        <div>
            <button onClick={handleSubmit}>작성</button>
        </div>
            
    </div>
}

export default MemoEditor;
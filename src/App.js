import React, {useRef, useState} from 'react';
import './App.css';
import MemoBoard from './MemoBoard';
import MemoEditor from './MemoEditor';

function App() {

  // /** 전역적으로 관리할 data State */
  const [data, setData] = useState([]);

  // memo id 생성
  const dataId = useRef(0);

  /**
   * MemoEditor에서 메모의 내용을 받아와 data에 set하는 함수 
   * @param {*} subject 
   * @param {*} title 
   * @param {*} content 
   */
  const onCreate = (subject, title, content) => {

    // 작성일 
    const writtenDate = new Date().getTime();
    
    const newItem = {
      subject, 
      title, 
      content,
      writtenDate,
      id: dataId.current,
    }

    dataId.current += 1;

    setData([newItem, ...data]);

  }


  /**
   * 메모 삭제 함수 
   * @param {*} targetId 
   */
  const onDelete = (targetId) => {
    // targetId가 없는 새로운 배열을 만듦(filter함수를 사용하여 id가 targetId와 같지 않은 요소들로 이루어진 새로운 배열 생성 )
    const newMemoBoard = data.filter((it)=>it.id !== targetId);
    setData(newMemoBoard);
  }
  

  /**
   * 메모 수정 함수
   * @param {*} targetId 
   * @param {*} newContent 
   */
  const onEdit = (targetId, newContent) => {

    // id가 tragetId와 일치한다면 해당 요소는 수정 대상으로 content만 newContent로 변경, 일치하지 않으면 원래 요소 반환
    setData(
      data.map((it) => it.id === targetId ? {...it, content:newContent} : it)
    );

  }
  

  return (
    <div className="App">

      <h1>Simple Memo</h1>

      <MemoEditor onCreate={onCreate}/>

      <hr/>
      <div className='anlysis-area'>
        <h4>총 {data.length}개의 메모</h4>
        <span>기타: 개</span>
        <span>쇼핑: 개</span>
        <span>할일: 개</span>
        <span>공부: 개</span>
      </div>

      <MemoBoard memoBoard={data} onDelete={onDelete} onEdit={onEdit}/>

    </div>
  );
}

export default App; 

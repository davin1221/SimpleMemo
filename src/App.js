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


  const onDelete = (targetId) => {
    // targetId가 없는 새로운 배열을 만듦(filter함수를 사용하여 id가 targetId와 같지 않은 요소들로 이루어진 새로운 배열 생성 )
    const newMemoBoard = data.filter((it)=>it.id !== targetId);
    setData(newMemoBoard);
  }


  return (
    <div className="App">

      <h1>Simple Memo</h1>

      <MemoEditor onCreate={onCreate}/>

      <hr />

      <MemoBoard memoBoard={data} onDelete={onDelete}/>

    </div>
  );
}

export default App; 

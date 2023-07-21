import React, {useCallback, useMemo, useRef, useState} from 'react';
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
  const onCreate = useCallback(
    
    (subject, title, content) => {

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

    

    // onCreate는 마운트됐을 때 한 번만 실행하는데 그 당시 data의 값은 []로 빈 배열이다. 
    // 그렇기 때문에 메모를 아무리 추가해도 다시 빈 배열로 리셋되는 것이다.
    // 만약 의존성 배열에 data를 넣는다면 데이터가 변경되면 함수를 재생성하는데 
    // 우리는 data가 State 변할때마다 onCreate가 재생성되지 않도록 하려 한 것이기 때문에 이를 쓰면 안된다. 
    // 함수형 업데이트를 사용해보자 : setData에 값이 아닌 함수를 전달하는 것이다. 
    setData((data)=>[newItem, ...data]);
    // 아이템을 추가한 데이터를 리턴하는 콜백함수를 setData함수에 전달한 것. 
    // 의존성배열을 비워도 최신의 상태를 인자를 통해 참고하게 하는 것이다. 


    // 빈배열: app.js가 마운트됐을때만 실행하고 그 뒤로는 실행하지 않음. 
  },[]);


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


  /**
   * 메모의 주제별 개수를 계산하는 함수
   */
  const getMemoAnalysis = useMemo(
    
    // 첫 번째 인자: 수행될 계산
    () => {

    const others = data.filter((it) => it.subject === "기타").length;
    const shopping = data.filter((it) => it.subject === "쇼핑").length;
    const toDo = data.filter((it) => it.subject === "할 일").length;
    const study = data.filter((it) => it.subject === "공부").length;

    return {others, shopping, toDo, study}
  }, [data.length]);

  // getMemoAnalysis는 지역함수로 작성하였으니 호출. 객체로 return했으니 객체로 비구조화 할당을 받음
  const {others, shopping, toDo, study} = getMemoAnalysis;
  

  return (
    <div className="App">

      <h1>Simple Memo</h1>

      <MemoEditor onCreate={onCreate}/>

      <hr/>
      <div className='anlysis-area'>
        <h4>총 {data.length}개의 메모</h4>
        <span>기타: {others}개</span>
        <span>쇼핑: {shopping}개</span>
        <span>할일: {toDo}개</span>
        <span>공부: {study}개</span>
      </div>

      <MemoBoard memoBoard={data} onDelete={onDelete} onEdit={onEdit}/>

    </div>
  );
}

export default App; 

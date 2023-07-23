import React, {useCallback, useMemo, useReducer, useRef} from 'react';
import './App.css';
import MemoBoard from './MemoBoard';
import MemoEditor from './MemoEditor';


// reducer는 복잡한 상태변화 로직을 컴포넌트 밖으로 분리하기 위한 것
// 두 개의 파라미터 : 1- 상태변화 직전 state 2- 어떤 상태변화를 일으켜야하는지의 정보가 담긴 action객체
const reducer = (state, action) => {

  // action 객체의 type 프로퍼티와 switch case를 사용하여 상태변화 
  // 필요한 action 
  // 1. onCreare  2. onDelte  3. onEdit
  switch(action.type) {
    case 'CREATE' : {
      const writtenDate = new Date().getTime();
      const newItem = {
        ...action.data,
        writtenDate
      }
      return [newItem, ...state]
    }
    case 'DELETE' : {
      return state.filter((it)=>it.id !== action.targetId);
    }
    case 'EDIT' : {
      return state.map((it)=> it.id === action.targetId ? {...it, content : action.newContent} : it);
    }
    default :
    //  default의 경우는 값의 변화가 없음

    return state;
  } 

  // return하는 값이 Data의 값이 됨

}


// context API를 이용하여 MEMO State를 전역으로 공급
// context도 내보내주어야 다른 컴포넌트들이 해당 context에 접근할 수 있기 때문에 export해줌 
export const MemoStateContext = React.createContext();

export const MemoDispatchContext = React.createContext();



function App() {

  // /** 전역적으로 관리할 data State */
  // const [data, setData] = useState([]); 
  const [data, dispatch] = useReducer(reducer,[]);

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

    dispatch({type:'CREATE', data:{subject, title, content, id:dataId.current }})

    dataId.current += 1;

    // 작성일 
    // const writtenDate = new Date().getTime();
    
    // const newItem = {
    //   subject, 
    //   title, 
    //   content,
    //   writtenDate,
    //   id: dataId.current,
    // }

    // setData((data)=>[newItem, ...data]);

    // 빈배열: app.js가 마운트됐을때만 실행하고 그 뒤로는 실행하지 않음. 
  },[]);


  /**
   * 메모 삭제 함수 
   * @param {*} targetId 
   */
  const onDelete = useCallback(
    (targetId) => {

      dispatch({type:'DELETE', targetId})
      
    // targetId가 없는 새로운 배열을 만듦(filter함수를 사용하여 id가 targetId와 같지 않은 요소들로 이루어진 새로운 배열 생성 )
    // setData((data)=> data.filter((it)=>it.id !== targetId));

  },[]);
  

  /**
   * 메모 수정 함수
   * @param {*} targetId 
   * @param {*} newContent 
   */
  const onEdit = useCallback(
    (targetId, newContent) => {

    dispatch({type:'EDIT', targetId, newContent})

    // id가 tragetId와 일치한다면 해당 요소는 수정 대상으로 content만 newContent로 변경, 일치하지 않으면 원래 요소 반환
    // setData( (data) =>
    //   data.map((it) => it.id === targetId ? {...it, content:newContent} : it)
    // );

  },[]);

  // 하나의 값으로 묶어 prop으로 전달 
  // useMemo 사용하여 App 컴포넌트가 재성성될 때 memoized~가 재생성되지 않도록 하기 위해 
  const memoizedDispatches = useMemo(()=> {
    return {onCreate, onDelete, onEdit}
  },[])


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
    // 공급자 컴포넌트로 래핑 , value로 값을 내려줌(data state)
    // provider도 컴포넌트이기 때문에 data와 함께 onCreate~ 등을 같이 내려주면 data state가 바뀔 때마다 
    // 또 렌더링이기 되기 때문에 최적화의 의미가 없어짐 
    // 해결: 컨텍스트를 중첩으로 만들면 된다. MemoStateContext은 memo state만 공급하기 위해 존재
    // onCreate~ 같은 상태를 변화시키는 dispatch 함수는 따로 만들어 자식으로 배치 
    <MemoStateContext.Provider value={data}>
        <MemoDispatchContext.Provider value={memoizedDispatches}>
          <div className="App">

            <h1>Simple Memo</h1>

            <MemoEditor/>

            <hr/>
            <div className='anlysis-area'>
              <h4>총 {data.length}개의 메모</h4>
              <span>기타: {others}개</span>
              <span>쇼핑: {shopping}개</span>
              <span>할일: {toDo}개</span>
              <span>공부: {study}개</span>
            </div>

            <MemoBoard />

          </div>
      </MemoDispatchContext.Provider>
    </MemoStateContext.Provider>
  );
}

export default App; 

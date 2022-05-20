import React, {useEffect, useState,useRef, useCallback} from 'react';
import './App.css';
import AppClockCheckNow from './TodoList/AppClockCheckNow.js';
import AppTodolist from './TodoList/AppTodolist.js'
import AppWelcome from './TodoList/AppWelcome.js'
import Modal from "./Modal.js"

function History_nav(){
  return(
    <nav>
        <div>LOGIN</div>
        <div>CALENDER</div>
        <div>STATICS</div>
      </nav>
  )
}


function App() {
  const stageState = ["EnterTodo","FilterTodo","EraseTodo"];
  const [prevStage,nextStage] = useState(0);
  const [prevModalState, nextModalState] = useState(false);
  
  const setStageAppClassName = (prevStage)=>{
    let nowStageClassName;
    if(prevStage === 0){
      nowStageClassName = 'App-EnterTodo';
    }else if(prevStage === 1){
      nowStageClassName = 'App-FilterTodo';
    }else{
      nowStageClassName = 'App-EraseTodo';
    }
    return nowStageClassName;
  }


  
  /*
  모달 로직 
  모달을 통해서 confirm을 진행한다.
  confirm됨과 동시에 이전단계로는 돌아 갈 수 없다.
  FBI WARNING 띄워야찌~
  */
  const modalMessage = "다음 단계로 넘어가면 이전 단계로는 돌아 갈 수 없습니다!\n 정말로 넘아가시겠습니까?"
  

  //Modal logic
  const isInitialMount = useRef(false);
  useEffect(() => {
    if (!isInitialMount.current && prevStage !=2) {
      isInitialMount.current = true;
    }else{
      return;
    }
  },[prevModalState]);



  //modal close logic
  const modelClose = () =>{
    nextModalState(false)
  }
  const modelCloseAndGoNext = useCallback(() =>{
    nextStage(prevStage+1);
    nextModalState(false);
  },[prevStage])

  const modalOpen = ()=>{
    nextModalState(true);
  }


  useEffect(()=>{
    window.addEventListener("keydown", (e) =>{
      if(e.shiftKey && e.key=='Enter') {
        modalOpen();
      }
    });
  },)

  return (
    
    <div className='App'>
      <Modal
      modalState={prevModalState}
      header={stageState[prevStage]}
      nowStage = {prevStage}
      modelClose={modelClose}
      modelCloseAndGoNext = {modelCloseAndGoNext}
      >
      {modalMessage}
      </Modal>

      <header className={setStageAppClassName(prevStage)}>
        <History_nav/>
        <AppWelcome/>
        <AppClockCheckNow/>
        <AppTodolist
          stageState = {stageState}
          nowStage = {prevStage}
        />
      </header>
    </div>
  );
}

export default App;

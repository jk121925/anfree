import React, {Component, useEffect, useState} from 'react';
import './App.css';
import AppClockCheckNow from './TodoList/AppClockCheckNow.js';
import AppTodolist from './TodoList/AppTodolist.js'
import AppWelcome from './TodoList/AppWelcome.js'

class History_nav extends Component{
  
  render(){
    return(
      <nav>
        <div>LOGIN</div>
        <div>CALENDER</div>
        <div>STATICS</div>
      </nav>
    );
  }
}

function App() {
  const stageState = ["EnterTodo","FilterTodo","EraseTodo"];
  const [prevStage,nextStage] = useState(0);

  const calStage = (event, prevStage) =>{
    
    if(event.shiftKey && event.key == 'Enter' && prevStage !=2){
      console.log("next stage console : ", event, prevStage);
      return nextStage(prevStage+1);
    }
    else if(event.shiftKey && event.key == 'Backspace' && prevStage !=0){
      console.log("prev stage console : ",event, prevStage);
      return nextStage(prevStage-1);
    }
    return;
  }



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


  useEffect(()=>{
      window.addEventListener("keydown", (e) =>calStage(e,prevStage));
      return () =>{
        window.removeEventListener("keydown",(e)=>calStage(e,prevStage));
        console.log("return")
      }
  }, [prevStage] )
  

  return (
    
    <div className='App'>
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

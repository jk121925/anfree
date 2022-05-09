import React, {Component, useState} from 'react';
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
  
  
  const stageChange =(stageNum)=>{
    nextStage(stageNum);
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



  // console.log(prevStage);
  return (
    <div className='App'>
      <header className={setStageAppClassName(prevStage)}>
        <History_nav></History_nav>
        <AppWelcome ></AppWelcome>
        <AppClockCheckNow></AppClockCheckNow>
        <AppTodolist
          _stageState = {stageState}
          stageChange = {stageChange}
        ></AppTodolist>
      </header>
    </div>
  );
}

export default App;

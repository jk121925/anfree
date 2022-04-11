import React, {Component, useState} from 'react';
import './App.css';
import ClockCheckNow from './TodoList/ClockCheckNow.js';
import Todolist from './TodoList/Todolist.js'
import Welcome from './TodoList/Welcome.js'

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



  console.log(prevStage);
  return (
    <div className='App'>
      <header className={setStageAppClassName(prevStage)}>
        <History_nav></History_nav>
        <Welcome ></Welcome>
        <ClockCheckNow></ClockCheckNow>
        <Todolist
          _stageState = {stageState}
          stageChange = {stageChange}
        ></Todolist>
      </header>
    </div>
  );
}

export default App;

import React, {Component, useState} from 'react';
import './App.css';
import ClockCheckNow from './TodoList/ClockCheckNow.js';
import Modal from './TodoList/Modal';
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
  

  return (
    <div className="App">
      <header className="App-header">
        <History_nav></History_nav>
        <Welcome ></Welcome>
        <ClockCheckNow></ClockCheckNow>
        <Todolist></Todolist>
      </header>
    </div>
  );
}

export default App;

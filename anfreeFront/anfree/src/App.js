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
  
  // const [pressShift, _pressShift] = useState(0);
  // const [pressArrow, _pressArrow] = useState('');
  // const changeShiftArrow = (e) =>{
  //   _pressShift(pressShift+1);
  //   _pressArrow(e.key);
    
  // }

  // var pressShiftCnt = 0;
  // var pressArrowDirection ='';
  // window.addEventListener('keydown',(e)=>{
  //   if(e.shiftKey &&  37<=e.keyCode && e.keyCode<=40){
  //     pressShiftCnt = pressShiftCnt+1;
  //     pressArrowDirection = e.key;
  //     console.log(pressShiftCnt , pressArrowDirection);
  //   }
  // })

  // React.useEffect(() => {
  //   window.addEventListener('keydown', (e) => {
  //     if(e.shiftKey &&  37<=e.keyCode && e.keyCode<=40){
  //       return changeShiftArrow(e);
  //     }
  //   });
  // },[pressShift,pressArrow]);
  
  return (
    <div className="App">
      <header className="App-header">

        <History_nav></History_nav>
        <Welcome ></Welcome>
        <ClockCheckNow></ClockCheckNow>
        <Todolist></Todolist>

        {/* <Todolist _pressShiftCnt={pressShiftCnt} _pressArrowDirection ={pressArrowDirection} ></Todolist> */}
      </header>
    </div>
  );
}

export default App;

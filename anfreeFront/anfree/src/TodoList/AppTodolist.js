import React, {useEffect, useState, useRef, useCallback} from "react";
import RenderTodoMemoDivReady from "./RenderTodoMemoDivReady"
// import ControllerReadyTodoList from "./ControllerReadyTodoList.js"
import ControllerTodoInput from "./ControllerTodoInput.js";
// import ControllerFilterTodoList from "./ControllerFilterTodoList.js"
import * as funcActionTM from "./FunctionTodoMemo.js"

// import Modal from "./Modal.js";





export default function AppTodolist(props) {
  const {stageState,nowStage} = props;
  const [prevTodoList, changeTodoList] = useState([[],[],[]]);
  const [listSelector, changeListSelector] = useState(1);
  const [memoSelector, changeMemoSelector] = useState(-1);
  const [todoSelector, changeTodoSelector] = useState(-1);
  //todoMode 
  // true -> todo
  // false -> memo
  const [todoMode, changeTodoMode] = useState(true);
  const ActionTodoMemo =useCallback((calListSelector,calTodoSelector,calList)=>{
    changeTodoList(calList);
    changeListSelector(calListSelector);
    changeTodoSelector(calTodoSelector);
  })
  
  const updateListFromInput=(updateTodoList) =>{
    changeTodoList(updateTodoList)
  }


  const keyDownEvent =(e)=>{
    let swapSet, moveSet,deleteSet;
    let swapMemoSet, moveMemoSet, deleteMemoSet;

      if(e.shiftKey && 37<=e.keyCode && e.keyCode<=40){
        if(todoMode){
          swapSet = funcActionTM.swapTodoContents(todoSelector,listSelector, e, nowStage, prevTodoList);
          if(swapSet !=null) return ActionTodoMemo(swapSet[0],swapSet[1],swapSet[2]);
        }else{
          swapMemoSet = funcActionTM.swapMemoContents(e,listSelector,todoSelector,memoSelector,prevTodoList)
          if(swapMemoSet !=null) return ActionTodoMemo(swapMemoSet[0],swapMemoSet[1],swapMemoSet[2]);
        }
      }
      //move
      else if(37<=e.keyCode && e.keyCode<=40){
        if(todoMode){
          moveSet = funcActionTM.moveTodoContents(todoSelector,listSelector, e, nowStage, prevTodoList)
          if(moveSet !=null) return ActionTodoMemo(moveSet[0],moveSet[1],moveSet[2]);  
        }else{
          moveMemoSet = funcActionTM.moveMemoContents(e, listSelector, todoSelector,memoSelector,prevTodoList)
          if(moveMemoSet!=null) changeMemoSelector(moveMemoSet);
        }
      }
      //Enter memo mode
      else if(e.key ==='/'){
        changeTodoMode(!todoMode);
      }
      //delete
      else if(e.shiftKey && e.key === 'Delete'){
        if(todoMode){
          deleteSet = funcActionTM.deleteTodoContents(listSelector,todoSelector,prevTodoList);
          if(deleteSet !=null)return ActionTodoMemo(deleteSet[0],deleteSet[1],deleteSet[2]);  
        }else{
          deleteMemoSet = funcActionTM.deleteMemoContents(listSelector,todoSelector,memoSelector,prevTodoList);
          if(deleteMemoSet!=null) return ActionTodoMemo(deleteMemoSet[0],deleteMemoSet[1],deleteMemoSet[2])
        }
      }

  }


  useEffect(()=>{
    window.addEventListener("keydown",keyDownEvent);
    return() =>{
      window.removeEventListener("keydown",keyDownEvent);
    }
  })



  console.log(todoMode)
  return(
    //조건부 렌더링
    <div>
      {
      (nowStage === 0) ? (
        <div>
        <ControllerTodoInput 
        nowTodoList = {prevTodoList} 
        updateContents={updateListFromInput}
        ></ControllerTodoInput>
        
        <RenderTodoMemoDivReady
          listSelector = {listSelector}
          todoSelector = {todoSelector}
          renderTodoList = {prevTodoList}
          memoSelector = {memoSelector}
          todoMode = {todoMode}
          memoUpdate = {updateListFromInput}
        ></RenderTodoMemoDivReady>
        </div>
      ) : null}


      
    </div>


    // <div>
    //   {props.nowStage === 0 ? (
    //     <ControllerTodoInput 
    //     _stage = {props.nowStage}
    //     _contents = {prevTodoList} 
    //     updateContents={nextTodoList}></ControllerTodoInput>
    //   ):null}
    //   {
    //     (props.nowStage === 0) ? (
    //       <ControllerReadyTodoList 
    //         _contents={prevTodoList}
    //         _stage = {props.nowStage}
    //         updateContentsTodoList={nextTodoList}
    //       ></ControllerReadyTodoList>
    //     ) : (
    //       (props.nowStage === 1) ? (
    //         <ControllerFilterTodoList 
    //           _contents={prevTodoList}
    //           _stage = {props.nowStage}
    //           updateContentsTodoList={nextTodoList}
    //       ></ControllerFilterTodoList>
    //       ) : (
    //         console.log("hi")
    //       )
    //     )


    //   }
    // </div>
    
  );

}

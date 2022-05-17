import React, {useEffect, useState, useRef} from "react";
import ControllerReadyTodoList from "./ControllerReadyTodoList.js"
import ControllerTodoInput from "./ControllerTodoInput.js";
import ControllerFilterTodoList from "./ControllerFilterTodoList.js"
import Modal from "./Modal.js";

export default function AppTodolist(props) {
  const [prevTodoList, nextTodoList] = useState([[],[],[]]);
  const [prevModalState, nextModalState] = useState(false);
  const closeModal = () =>{nextModalState(false)};

  const modalMessage = (nextprev)=>{
    if(nextprev == 'Next'){
      let returnstr;
      if(nextprev==='Next'){
        returnstr = "Few second after you go to Next step";
      }else if(nextprev==='Prev'){
        returnstr = "Few second after you go to Previous step"
      }
      return returnstr;
    }
  }

  //Modal logic
  const isInitialMount = useRef(false);
  useEffect(() => {
    if (!isInitialMount.current) {
      isInitialMount.current = true;
    } else {
      nextModalState(true);  
    }
  },[props.nowStage]);

  return(
    <div>
      <Modal
      _modalState={prevModalState}
      _header={props.stageState[props.nowStage]}
      closeModal={closeModal}
      >
      {modalMessage('Next')}
      </Modal>


      {props.nowStage === 0 ? (
        <ControllerTodoInput 
        _stage = {props.nowStage}
        _contents = {prevTodoList} 

        updateContents={nextTodoList}></ControllerTodoInput>
      ):null}
      {
        (props.nowStage === 0) ? (
          <ControllerReadyTodoList 
            _contents={prevTodoList}
            _stage = {props.nowStage}ㅁ
            updateContentsTodoList={nextTodoList}
          ></ControllerReadyTodoList>
        ) : (
          (props.nowStage === 1) ? (
            <ControllerFilterTodoList 
              _contents={prevTodoList}
              _stage = {props.nowStage}
              updateContentsTodoList={nextTodoList}
          ></ControllerFilterTodoList>
          ) : (
            console.log("hi")
          )
        )


      }
    </div>
    
  );

}

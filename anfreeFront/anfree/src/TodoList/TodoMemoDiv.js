import React ,{useState}from "react";
import MemoInput from "./MemoInput";
import "./TodoElement.css"

function TodoMemoDiv({_contents,_mode,_currentTodoSelector,_writeContentMode,_currentMemoSelector}){
    // console.log("TodoMemoDiv and _currentMemoSelector" ,_currentTodoSelector, _currentMemoSelector);
    const [preContents, AfterContents] = useState(_contents);
    var returnList =[]

    const setAfterContents =(update)=>{
        AfterContents(update);
    }

    const makeMemoDivList =(memoListByContent,__currentMemoSelector)=>{
        return(
            memoListByContent.map((memoElement,index)=>(
                <div className={(__currentMemoSelector===index ) ? "memoElement-now":"memoElement"} key={i+memoElement}>{memoElement}</div>
            ))
        )
    }
    


    var renderContainer = Array.from(_contents);
    var i=0;
    
    if(_mode === 'selectorMode'){
        while(i<renderContainer.length){
            if(_currentTodoSelector!==-1 && i===_currentTodoSelector){
                if(_writeContentMode ==='memoList'){
                    returnList.push(
                        <div className="todoMainElement-now" key={renderContainer[i].todolist}>
                            {renderContainer[i].todolist}
                            <div className="MemoInput" key={renderContainer[i].todolist +"mempInputs"}>
                                <MemoInput
                                    _memoContents = {renderContainer}
                                    _memoIdx = {_currentTodoSelector}
                                    _setterContents = {setAfterContents}
                                ></MemoInput> 
                            </div>
                            {makeMemoDivList(renderContainer[i].memolist,_currentMemoSelector)}
                        </div>
                    );
                }else{
                    returnList.push(
                        <div className="todoMainElement-now" key={renderContainer[i].todolist}>
                            {renderContainer[i].todolist}
                            {makeMemoDivList(renderContainer[i].memolist,-1)}
                        </div>
                    );
                }
            }else{
                returnList.push(
                    <div className="todoMainElement" key={renderContainer[i].todolist}>
                        {renderContainer[i].todolist}
                        {makeMemoDivList(renderContainer[i].memolist,-1)}
                    </div>
                );
            }
            i=i+1;
        }//end while
    }else{
        while(i<renderContainer.length){
            returnList.push(
            <div className="todoMainElement" key={renderContainer[i].todolist}>
                {renderContainer[i].todolist}
                {makeMemoDivList(renderContainer[i].memolist,-1)}
            </div>
            );
            
            i=i+1
        }
    }
    return(
        returnList
    );
};

export default TodoMemoDiv;





    // refactorying waiting
    // _className : todoListClassName
    // _renderContainerElement : todolist where index i
    // _inputMemoCheck : true or false
    // _modeSelectCheck : true or false
    // const makeTodoDivList =(_todoListClassName, _renderContainerElement,_inputMemoCheck,_modeSelectCheck)=>{
    //     if(_modeSelectCheck){
    //         if(_inputMemoCheck){
    //             return(
    //                 <div className={_todoListClassName} key={_renderContainerElement.todolist}>
    //                     {_renderContainerElement.todolist}
    
    //                     <div className="memoInput" key={_renderContainerElement.todolist +"mempInputs"}>
    //                         <MemoInput
    //                             _memoContents = {renderContainer}
    //                             _memoIdx = {_currentTodoSelector}
    //                             _setterContents = {setAfterContents}
    //                         ></MemoInput> 
    //                     </div>
    //                     {makeMemoDivList(_renderContainerElement.memolist)}
    //                 </div>
    //             )
    //         }else{
    //             return(
    //                 <div className={_todoListClassName} key={_renderContainerElement.todolist}>
    //                     {_renderContainerElement.todolist}
    //                     {makeMemoDivList(_renderContainerElement.memolist)}
    //                 </div>
    //             )
    //         }
    //     }else{
    //         return(
    //             <div className={_todoListClassName} key={_renderContainerElement.todolist}>
    //                 {_renderContainerElement.todolist}
    //                 {makeMemoDivList(_renderContainerElement.memolist)}
    //             </div>
    //         )
    //     }
        
    // }
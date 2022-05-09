import React ,{useState}from "react";
import RenderMemoInput from "./RenderMemoInput";
import "./RenderTodoElementEnter.css"

function TodoMemoDivEnter({_contents,_mode,_currentTodoSelector,_writeContentMode,_currentMemoSelector}){
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
                                <RenderMemoInput
                                    _memoContents = {renderContainer}
                                    _memoIdx = {_currentTodoSelector}
                                    _setterContents = {setAfterContents}
                                ></RenderMemoInput> 
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

export default TodoMemoDivEnter; 
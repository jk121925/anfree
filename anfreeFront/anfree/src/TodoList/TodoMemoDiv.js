import React from "react";
import MemoInput from "./MemoInput";
import "./TodoElement.css"



function MemoDiv({memoElement,todoElement}){
    var memoKey = todoElement + "-" + memoElement;
    return(
        <div className="memoElement" key ={memoKey}>
            {memoElement}
        </div>
    )
};


function TodoMemoDivRender({_contents,_mode,_currentSelector,_writeContentMode}){
    var returnList =[]
    var renderContainer = Array.from(_contents);
    var i=0;

    console.log(_contents,_mode,_currentSelector,_writeContentMode);

    if(_mode === 'selectorMode'){
        while(i<renderContainer.length){
            if(_currentSelector!==-1 && i===_currentSelector){
                returnList.push(
                    <div className="todoMainElement-now" key={renderContainer[i].todolist}>
                        {renderContainer[i].todolist}
                        <MemoInput></MemoInput>
                        {renderContainer[i].memolist.map(memoElement=>(
                            <MemoDiv memoElement={memoElement} todoElement={renderContainer[i].todolist}/>
                        ))}
                    </div>
                );
            }else{
                returnList.push(
                    <div className="todoMainElement" key={renderContainer[i].todolist}>
                        {renderContainer[i].todolist}
                        {renderContainer[i].memolist.map(memoElement=>(
                            <MemoDiv memoElement={memoElement} todoElement={renderContainer[i].todolist}/>
                        ))}
                    </div>
                );
            }
            i=i+1;
        }
    }else{
        while(i<renderContainer.length){
            returnList.push(
            <div className="todoMainElement" key={renderContainer[i].todolist}>
                {renderContainer[i].todolist}
                {renderContainer[i].memolist.map(memoElement=>(
                    <MemoDiv memoElement={memoElement} todoElement={renderContainer[i].todolist}/>
                ))}
            </div>
            );
            
            i=i+1
        }
    }
    return(
        returnList
    );
};

export default TodoMemoDivRender;
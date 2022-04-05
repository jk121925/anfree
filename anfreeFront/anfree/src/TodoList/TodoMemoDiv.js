import React ,{useState}from "react";
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
    const [preContents, AfterContents] = useState(_contents);
    var returnList =[]
    console.log("after memo = " ,_contents);

    const setAfterContents =(update)=>{
        AfterContents(update);
    }
    var renderContainer = Array.from(_contents);
    var i=0;
    
    console.log(_contents,_mode,_currentSelector,_writeContentMode);

    if(_mode === 'selectorMode'){
        while(i<renderContainer.length){
            if(_currentSelector!==-1 && i===_currentSelector){
                if(_writeContentMode ==='memoList'){
                    console.log('memoList');
                    returnList.push(
                        <div className="todoMainElement-now" key={renderContainer[i].todolist + "" +i}>
                            {renderContainer[i].todolist}
                            <div className="memoInput">
                                <MemoInput
                                    _memoContents = {renderContainer}
                                    _memoIdx = {_currentSelector}
                                    _setterContents = {setAfterContents}
                                ></MemoInput>
                                {renderContainer[i].memolist.map(memoElement=>(
                                    <MemoDiv memoElement={memoElement} todoElement={renderContainer[i].todolist}/>
                                ))}
                            </div>
                        </div>
                    );
                }else{
                    returnList.push(
                        <div className="todoMainElement-now" key={renderContainer[i].todolist + "" +i}>
                            {renderContainer[i].todolist}
                            <div className="memoInput">
                                {renderContainer[i].memolist.map(memoElement=>(
                                    <MemoDiv memoElement={memoElement} todoElement={renderContainer[i].todolist}/>
                                ))}
                            </div>
                        </div>
                    );
                }
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
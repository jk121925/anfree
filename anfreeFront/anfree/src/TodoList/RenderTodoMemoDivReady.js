import React ,{ memo, useState}from "react";
import RenderMemoInput from "./RenderMemoInput";
import "./RenderTodoElementEnter.css"

function TodoMemoDivReady(props){
    const {listSelector,todoSelector,renderTodoList,memoSelector,todoMode,memoUpdate} = props;
    console.log(props)
    var returnRenderList =[]
    const makeMemoDivList =(memoListByList,memoSelector)=>{
        return(
            memoListByList.map((memoElement,index)=>(
                <div className={(memoSelector===index ) ? "memoElement-now":"memoElement"} key={index+ "_"+ memoElement}>{memoElement}</div>
            ))
        )
    }

    const makeReadyTodoDivList = (listSelector,todoSelector,renderTodoList,memoSelector) =>{
        let tempArr = []; 
        let i=0;
        let setClassName = "READY";
        while(i<renderTodoList[listSelector].length){            
            if(!todoMode&& i === todoSelector){
                tempArr.push(
                    <div className={(todoSelector === i)? setClassName + "-now" : setClassName} key={renderTodoList[i] + "-" + i}>
                        {renderTodoList[listSelector][i].todolist}
                        <div className="MemoInput" key={renderTodoList[i].todolist +"mempInputs"}>
                        <RenderMemoInput
                            renderTodoList = {renderTodoList}
                            memoSelector = {memoSelector}
                            listSelector = {listSelector}
                            todoSelector = {todoSelector}
                            memoUpdate = {memoUpdate}
                        />
                        </div>
                        {(renderTodoList[listSelector][i].memolist.length !=0)? makeMemoDivList(renderTodoList[listSelector][i].memolist,memoSelector) : null}
                    </div>
                )
            }
            else{
                tempArr.push(
                    <div className={(todoSelector === i)? setClassName + "-now" : setClassName} key={renderTodoList[i] + "-" + i}>
                        {renderTodoList[listSelector][i].todolist}
                        {(renderTodoList[listSelector][i].memolist.length !=0)? makeMemoDivList(renderTodoList[listSelector][i].memolist,memoSelector) : null}
                    </div>
                )
            }
            i = i+1;
        }
        return tempArr;
    }
    
    returnRenderList.push(makeReadyTodoDivList(listSelector,todoSelector,renderTodoList,memoSelector));


    // var renderContainer = Array.from(renderTodoList);
    // var i=0;
    
    // if(ActionMode === 'selectorMode'){
    //     while(i<renderContainer.length){
    //         if(todoSelector!==-1 && i===todoSelector){
    //             if(writeMode ==='memoList'){
    //                 returnList.push(
    //                     <div className="todoMainElement-now" key={renderContainer[i].todolist}>
    //                         {renderContainer[i].todolist}
    //                         <div className="MemoInput" key={renderContainer[i].todolist +"mempInputs"}>
    //                             <RenderMemoInput
    //                                 _memoContents = {renderContainer}
    //                                 _memoIdx = {todoSelector}
    //                                 _setterContents = {setAfterContents}
    //                             ></RenderMemoInput> 
    //                         </div>
    //                         {makeMemoDivList(renderContainer[i].memolist,memoSelector)}
    //                     </div>
    //                 );
    //             }else{
    //                 returnList.push(
    //                     <div className="todoMainElement-now" key={renderContainer[i].todolist}>
    //                         {renderContainer[i].todolist}
    //                         {makeMemoDivList(renderContainer[i].memolist,-1)}
    //                     </div>
    //                 );
    //             }
    //         }else{
    //             returnList.push(
    //                 <div className="todoMainElement" key={renderContainer[i].todolist}>
    //                     {renderContainer[i].todolist}
    //                     {makeMemoDivList(renderContainer[i].memolist,-1)}
    //                 </div>
    //             );
    //         }
    //         i=i+1;
    //     }//end while
    // }else{
    //     while(i<renderContainer.length){
    //         returnList.push(
    //         <div className="todoMainElement" key={renderContainer[i].todolist}>
    //             {renderContainer[i].todolist}
    //             {makeMemoDivList(renderContainer[i].memolist,-1)}
    //         </div>
    //         );
            
    //         i=i+1
    //     }
    // }
    return(
        returnRenderList
    );
};

export default TodoMemoDivReady; 
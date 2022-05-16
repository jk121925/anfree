import React ,{useState}from "react";
import "./RenderTodoElementFilter.css"

function RenderTodoMemoDiveFilter({_currentTodoSelector,_currentMemoSelector,_filterTodoCursorListCnt,_filterTodoCursorList}){
    let filteredList =[];

    // make memo <div> list
    // 메모 리스트를 만드는 component
    const makeMemoDivList =(memoListByContent,__currentMemoSelector)=>{
        return(
            memoListByContent.map((memoElement,index)=>(
                <div className={(__currentMemoSelector===index ) ? "memoElement-now":"memoElement"} key={i+memoElement}>{memoElement}</div>
            ))
        )
    }
    // filteredListNum => 0 - willNotDoList,1 - readyList ,2 - willDoList
    const makeFilterdTodoDivList =(filteredListNum,__filteredList,__filterTodoCursorListCnt,__currentTodoSelector,__currentMemoSelector)=>{
        let tempArr =[]; let i=0;
        let setClassName = (filteredListNum === 0) ? "willNotDo" : ((filteredListNum === 1) ? "ready" : "willDo");

        while(i<__filteredList[filteredListNum].length){
            
            tempArr.push(
                <div className={(filteredListNum === __filterTodoCursorListCnt && i === __currentTodoSelector) ? setClassName + "-now" : setClassName} key={__filteredList[filteredListNum][i].todolist}>
                    {__filteredList[filteredListNum][i].todolist}
                    {makeMemoDivList(__filteredList[filteredListNum][i].memolist,__currentMemoSelector)}
                </div>
            )
            i = i+1;
        }
        return tempArr;
    }


    var i=0;
    for( i = 0; i<3; i++){
        filteredList.push(makeFilterdTodoDivList(i,_filterTodoCursorList,_filterTodoCursorListCnt,_currentTodoSelector,_currentMemoSelector));
    }
    
    return(
        <div className="filterDiv">
            <div className="willNotDoListDiv">
                {filteredList[0]}
            </div>
            <div className="readyListDiv">
                {filteredList[1]}
            </div>
            <div className="willDoListDiv">
                {filteredList[2]}
            </div>
        </div>
    );
};

export default RenderTodoMemoDiveFilter; 
import React ,{useState}from "react";
import RenderMemoInput from "./RenderMemoInput";
import "./RenderTodoElementFilter.css"

function RenderTodoMemoDiveFilter({_mode,_currentTodoSelector,_currentMemoSelector,_filterTodoCursorListCnt,_filterTodoCursorList}){
    // const [preContents, AfterContents] = useState(_contents);
    let filteredList =[];
    console.log(_currentTodoSelector,_filterTodoCursorListCnt);
    // const setAfterContents =(update)=>{
    //     AfterContents(update);
    // }

    // make memo <div> list
    // 메모 리스트를 만드는 component
    const makeMemoDivList =(memoListByContent,__currentMemoSelector)=>{
        return(
            memoListByContent.map((memoElement,index)=>(
                <div className={(__currentMemoSelector===index ) ? "memoElement-now":"memoElement"} key={i+memoElement}>{memoElement}</div>
            ))
        )
    }
    // __i => 0 - willNotDoList,1 - readyList ,2 - willDoList
    const makeFilterdTodoDivList =(__i,__filteredList,__filterTodoCursorListCnt,__currentTodoSelector,__currentMemoSelector)=>{
        let tempArr =[]; let i=0;
        let setClassName = (__i === 0) ? "willNotDo" : ((__i === 1) ? "ready" : "willDo");

        while(i<__filteredList[__i].length){
            
            tempArr.push(
                <div className={(__i === __filterTodoCursorListCnt && i === __currentTodoSelector) ? setClassName + "-now" : setClassName} key={__filteredList[__i][i].todolist}>
                    {__filteredList[__i][i].todolist}
                    {makeMemoDivList(__filteredList[__i][i].memolist,__currentMemoSelector)}
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
            <div className="readyDiv">
                {filteredList[1]}
            </div>
            <div className="willDoListDiv">
                {filteredList[2]}
            </div>
        </div>
    );
};

export default RenderTodoMemoDiveFilter; 
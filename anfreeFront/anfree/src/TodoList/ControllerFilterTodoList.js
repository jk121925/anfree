import { render } from "@testing-library/react";
import React, {Component, memo} from "react";
import RenderTodoMemoDiveFilter from "./RenderTodoMemoDiveFilter";

// mode, contents
class RenderTodoList extends Component{
    constructor(props){
        super(props);
        //actionMode : writeMode, selectorMode,
        this.actionMode = 'selectorMode';
        this.currentTodoSelector = 0;
        this.currentMemoSelector = -1;
        this.writeContentMode = 'todoList'
        // filterTodo cursor
        this.filterTodoCursorListCnt =1;     
        this.state={
            pressArrowDirection : ''
        }
    }
    /*
    TodoList 위아리 바꾸기
    UpDown : 위인지 아래인지
    targetList : 지우고자 하는 list => 0,1,2
    currentTodoSelector : 현재 선택된 번호 => 몇번째가 선택 되었는지
    updateFunction : 함수에서 callback 하는 구조 => property에서 받아온 값
    propsContents : property로 부터 받아온 [[],[],[]] 리스트 전체
    */
    swapTodoContents(UpDown,targetList,currentSelector,updateFunction,propsContents){
        var upDownInt = (UpDown === 'up')? -1 :1;
        var updateContentsList = Array.from(propsContents);
        var temp = updateContentsList[targetList][currentSelector];
        updateContentsList[targetList][currentSelector] = updateContentsList[targetList][currentSelector+upDownInt];
        updateContentsList[targetList][currentSelector+upDownInt] = temp;
        updateFunction(updateContentsList);
    }

    /*
    Memo 위아래 바꾸기
    UpDown : 위인지 아래인지
    targetList : 지우고자 하는 list => 0,1,2
    currentTodoSelector : 현재 선택된 번호 => 몇번째가 선택 되었는지
    currentMemoSelector : 현재 선택된 메모 번호
    updateFunction : 함수에서 callback 하는 구조 => property에서 받아온 값
    propsContents : property로 부터 받아온 [[],[],[]] 리스트 전체
    */
    swapMemoContents(UpDown,targetList,currentTodoSelector,currentMemoSelector,updateFunction,propsContents){
        let memoIdx = currentMemoSelector;
        let todoIdx = currentTodoSelector;
        var upDownInt = (UpDown === 'up')? -1 :1;
        var updateContentsList = Array.from(propsContents);
        var temp = updateContentsList[targetList][todoIdx].memolist[memoIdx];
        updateContentsList[targetList][todoIdx].memolist[memoIdx] = updateContentsList[targetList][todoIdx].memolist[memoIdx + upDownInt];
        updateContentsList[targetList][todoIdx].memolist[memoIdx+upDownInt] = temp;
        updateFunction(updateContentsList);
    }

    /*
    MemoList 삭제
    targetList : 지우고자 하는 list => 0,1,2
    currentTodoSelector : 현재 선택된 번호 => 몇번째가 선택 되었는지
    currentMemoSelector : 현재 선택된 메모 번호
    propsContents : property로 부터 받아온 [[],[],[]] 리스트 전체
    */
    deleteMemoContents(targetList,currentTodoSelector,currentMemoSelector,propsContents){
        let memolength = propsContents[targetList][currentTodoSelector].memolist.length;
        for(var i = currentMemoSelector; i<propsContents[targetList][currentTodoSelector].length-1; i++){
            propsContents[targetList][currentTodoSelector].memolist[i] = 
            propsContents[targetList][currentTodoSelector].memolist[i+1]
        }
        propsContents[targetList][currentTodoSelector].memolist=
        propsContents[targetList][currentTodoSelector].memolist.slice(0,memolength-1);
        return propsContents;
    }

    // 함수에는 해당되는 기능만을 집중해서 구현하자 -> 함수는 필요한 것만!
    /*
    TodoList 삭제
    targetList : 지우고자 하는 list => 0,1,2
    currentTodoSelector : 현재 선택된 번호 => 몇번째가 선택 되었는지
    propsContents : property로 부터 받아온 [[],[],[]] 리스트 전체
    */
    deleteTodoContents(targetList,currentTodoSelector,propsContents){
        for(var i=currentTodoSelector; i<propsContents[targetList].length-1; i++){
            propsContents[targetList][i] = propsContents[targetList][i+1];
        }
        propsContents = propsContents[targetList].slice(0,propsContents.length-1);
        return propsContents;
    }


    /*
    nowListNum : 현재 cursor number
    LeftRight : 이동해야하는 방향
    */
    changeFilterListCnt(nowListNum, LeftRight, propsContents){
        if(LeftRight === 'ArrowRight'){
            if(nowListNum === 1) {
                if(propsContents[2].length ===0) nowListNum =1;
                else nowListNum = 2;
            }
            else if(nowListNum === 0){
                if(propsContents[1].length !==0) nowListNum = 1;
                else if(propsContents[1].length ===0 && propsContents[2].length!==0) nowListNum = 2;
                else nowListNum =0;
            }
        }
        else if(LeftRight === 'ArrowLeft'){
            if(nowListNum === 1) {
                if(propsContents[0].length ===0) nowListNum =1;
                else nowListNum =0;
            }
            else if(nowListNum ===2){
                if(propsContents[1].length!==0) nowListNum =1;
                else if(propsContents[1].length === 0 && propsContents[0].length!==0) nowListNum =0;
                else nowListNum = 2;
            }
        }
        return nowListNum;
    }

    changeFilterListElement(nowListNum, LeftRight, nowListIdx , propsContents, updateFunction){
        
        let changeFilterList = Array.from(propsContents);
        let moveIdx =-1;
        // 상태 변경
        if(moveIdx === -1){
            if(LeftRight === 'ArrowRight' && nowListNum === 2 ) return;
            else if(LeftRight === 'ArrowRight' && nowListNum !=2 ) moveIdx = nowListNum+1;
            else if(LeftRight === 'ArrowLeft' && nowListNum === 0 ) return;
            else if(LeftRight === 'ArrowLeft' && nowListNum !== 0  )moveIdx = nowListNum-1;
        }

        let changeMode =(moveIdx === 0 )? 'willNotDo' : ((moveIdx === 1) ? 'ready' : 'willDo');
        changeFilterList[nowListNum][nowListIdx].todoState = changeMode;
        // 이동시킴
        changeFilterList[moveIdx].push(changeFilterList[nowListNum][nowListIdx]);
        // 원래 list에서 제거
        for(let i=nowListIdx; i<changeFilterList[nowListNum].length-1; i++){
            changeFilterList[nowListNum][i] = changeFilterList[nowListNum][i+1];
        }
        changeFilterList[nowListNum] = changeFilterList[nowListNum].slice(0, changeFilterList[nowListNum].length-1);
        return updateFunction(changeFilterList);
    }

    componentDidMount() {
        window.addEventListener('keydown',(e)=>{
            // console.log("controllerfiltertodolist ",this.props._contents);
            if(this.props._stage === 1){
                console.log("controllerFilterTodoList : componentDidMount start", this.props._stage);
                // 위치변경 로직
                if(e.shiftKey && 37<=e.keyCode && e.keyCode<=40 && this.actionMode === 'selectorMode'){
                    var _pressArrowDirection = e.key;
                    // console.log(this.props._contents);
                    if(this.actionMode==='selectorMode' && this.writeContentMode==='memoList'){
                        let memolength = this.props._contents[this.filterTodoCursorListCnt][this.currentTodoSelector].memolist.length;
                        if(_pressArrowDirection === 'ArrowDown' && this.currentMemoSelector!=memolength-1){
                            this.swapMemoContents('down',this.filterTodoCursorListCnt,this.currentTodoSelector,this.currentMemoSelector,this.props.updateContentsTodoList,this.props._contents);
                        }else if(_pressArrowDirection==='ArrowUp' && this.currentMemoSelector !=0){
                            this.swapMemoContents('up',this.filterTodoCursorListCnt,this.currentTodoSelector,this.currentMemoSelector,this.props.updateContentsTodoList,this.props._contents);
                        }
                    }else{
                        if(_pressArrowDirection === 'ArrowDown' && this.currentTodoSelector!=this.props._contents[this.filterTodoCursorListCnt].length-1){
                            this.swapTodoContents('down',this.filterTodoCursorListCnt,this.currentTodoSelector,this.props.updateContentsTodoList,this.props._contents);
                        }else if(_pressArrowDirection==='ArrowUp' && this.currentTodoSelector !=0){
                            this.swapTodoContents('up',this.filterTodoCursorListCnt,this.currentTodoSelector,this.props.updateContentsTodoList,this.props._contents);
                        }
                    }

                    // change todoList mode
                    // todoList mode를 바꾼다. Not will Do and Will Do
                    if(_pressArrowDirection === 'ArrowLeft'){
                        this.changeFilterListElement(this.filterTodoCursorListCnt, 'ArrowLeft', this.currentTodoSelector , this.props._contents, this.props.updateContentsTodoList);
                    }else if(_pressArrowDirection === 'ArrowRight'){
                        this.changeFilterListElement(this.filterTodoCursorListCnt, 'ArrowRight', this.currentTodoSelector , this.props._contents, this.props.updateContentsTodoList);
                    }

                    
                    // this.forceUpdate();
                }



                // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                // filterTodo 상태에서 이동제어
                // 이동에 관한 것
                // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                else if(37<=e.keyCode && e.keyCode<=40){
                    var _pressArrowDirection = e.key;
                    if(this.actionMode==='selectorMode' && this.writeContentMode==='memoList'){
                        //controll memo mode
                        let nowMemolist = this.props._contents[this.currentTodoSelector].memolist;
                        if(_pressArrowDirection === 'ArrowDown'){
                            if(nowMemolist.length !== 0){
                                this.currentMemoSelector = (nowMemolist.length-1 === this.currentMemoSelector) ? nowMemolist.length-1: this.currentMemoSelector+1;    
                            }
                        }else if(_pressArrowDirection === 'ArrowUp'){
                            if(nowMemolist.length!==0){
                                this.currentMemoSelector = (this.currentMemoSelector === 0)? 0 : this.currentMemoSelector-1;
                            }
                        }
                    }else{
                        //controll todo mode
                        if(_pressArrowDirection === 'ArrowDown'){
                            this.currentTodoSelector = (this.currentTodoSelector === this.props._contents[this.filterTodoCursorListCnt].length-1)? this.props._contents[this.filterTodoCursorListCnt].length-1 : this.currentTodoSelector+1;                        
                        }else if(_pressArrowDirection === 'ArrowUp'){
                            this.currentTodoSelector = (this.currentTodoSelector === 0)? 0 : this.currentTodoSelector-1;
                        }else if(_pressArrowDirection === 'ArrowLeft'){
                            this.filterTodoCursorListCnt = this.changeFilterListCnt(this.filterTodoCursorListCnt, "ArrowLeft",this.props._contents);
                            this.currentTodoSelector =0;
                        }else if(_pressArrowDirection === 'ArrowRight'){
                            this.filterTodoCursorListCnt = this.changeFilterListCnt(this.filterTodoCursorListCnt, "ArrowRight",this.props._contents);
                            this.currentTodoSelector =0;
                        }
                    }
                    this.forceUpdate();
                }


                // 메모의 상태를 변경하기 위해서 사용
                if(this.actionMode === 'selectorMode' && e.key === '/'){
                    if(this.writeContentMode === 'todoList') {
                        this.writeContentMode = 'memoList';
                        this.currentMemoSelector = 0;
                    }
                    else {
                        this.writeContentMode = 'todoList';
                        this.currentMemoSelector = -1;
                    }
                    e.target.value = "";
                    this.forceUpdate();
                }
                
            }
            
            
        })
    }



    render(){
        // console.log("render time " ,this.props._contents);
        return(
            <div className="FilterTodo">
            <RenderTodoMemoDiveFilter
                _currentTodoSelector = {this.currentTodoSelector}
                _currentMemoSelector = {this.currentMemoSelector}
                _filterTodoCursorListCnt = {this.filterTodoCursorListCnt}
                _filterTodoCursorList = {this.props._contents}
            ></RenderTodoMemoDiveFilter>
            </div>
        )
    }
}

export default RenderTodoList;
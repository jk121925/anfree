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

        this.readyList = this.props._contents;
        this.willNotDoList = [];
        this.willDoList =[];

        // filterTodo cursor
        this.filterTodoCursorList =[this.willNotDoList,this.readyList,this.willDoList];   
        this.filterTodoCursorListCnt =1;     
        this.state={
            pressArrowDirection : ''
        }
    }
    //다시
    swapTodoContents(UpDown){
        var upDownInt = (UpDown === 'up')? -1 :1;
        var updateContentsList = Array.from(this.props._contents);
        var temp = updateContentsList[this.currentTodoSelector];
        updateContentsList[this.currentTodoSelector] = updateContentsList[this.currentTodoSelector+upDownInt];
        updateContentsList[this.currentTodoSelector+upDownInt] = temp;
        this.props.updateContentsTodoList(updateContentsList);
    }
    //다시
    swapMemoContents(UpDown){
        let memoIdx = this.currentMemoSelector;
        let todoIdx = this.currentTodoSelector;
        var upDownInt = (UpDown === 'up')? -1 :1;
        var updateContentsList = Array.from(this.props._contents);
        var temp = updateContentsList[todoIdx].memolist[memoIdx];
        updateContentsList[todoIdx].memolist[memoIdx] = updateContentsList[todoIdx].memolist[memoIdx + upDownInt];
        updateContentsList[todoIdx].memolist[memoIdx+upDownInt] = temp;
        this.props.updateContentsTodoList(updateContentsList);
    }

    componentDidMount() {
        window.addEventListener('keydown',(e)=>{
            if(this.props._stage === 'FilterTodo'){

                // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                // filterTodo 상태에서 이동제어
                // 이동에 관한 것
                // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                if(!e.shiftKey && 37<=e.keyCode && e.keyCode<=40){
                    console.log("fuck");
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
                            if(this.actionMode==='writeMode' && this.props._contents.length!==0){
                                this.currentTodoSelector = 0;
                                this.actionMode = 'selectorMode'
                            }else if(this.actionMode === 'selectorMode'){
                                this.currentTodoSelector = (this.currentTodoSelector === this.props._contents.length-1)? this.props._contents.length-1 : this.currentTodoSelector+1;                        
                            }
                        }else if(_pressArrowDirection === 'ArrowUp'){
                            if(this.actionMode === 'selectorMode'){
                                this.currentTodoSelector = (this.currentTodoSelector === 0)? 0 : this.currentTodoSelector-1;
                            }
                        }else if(_pressArrowDirection === 'ArrowLeft'){
                            this.filterTodoCursorListCnt = (this.filterTodoCursorListCnt == 0) ? 0 : this.filterTodoCursorListCnt-1;
                            console.log("filter enter Arrow left")
                        }else if(_pressArrowDirection === 'ArrowRight'){
                            console.log("filter enter Arrow Right")
                            this.filterTodoCursorListCnt = (this.filterTodoCursorListCnt == 2) ? 2 : this.filterTodoCursorListCnt+1;
                        }
                    }
                    this.forceUpdate();
                }


                // 위치변경 로직
                if(e.shiftKey && 37<=e.keyCode && e.keyCode<=40 && this.actionMode === 'selectorMode'){
                    var _pressArrowDirection = e.key;
    
                    if(this.actionMode==='selectorMode' && this.writeContentMode==='memoList'){
                        let memolength = this.props._contents[this.currentTodoSelector].memolist.length;
                        if(_pressArrowDirection === 'ArrowDown' && this.currentMemoSelector!=memolength-1){
                            this.swapMemoContents('down');
                        }else if(_pressArrowDirection==='ArrowUp' && this.currentMemoSelector !=0){
                            this.swapMemoContents('up');
                        }
                    }else{
                        if(_pressArrowDirection === 'ArrowDown' && this.currentTodoSelector!=this.props._contents.length-1){
                            this.swapTodoContents('down');
                        }else if(_pressArrowDirection==='ArrowUp' && this.currentTodoSelector !=0){
                            this.swapTodoContents('up');
                        }
                    }
                    // change todoList mode
                    // todoList mode를 바꾼다. Not will Do and Will Do
                    if(_pressArrowDirection === 'ArrowLeft' && this.filterTodoCursorListCnt !==0){
                        let tempIdx = this.filterTodoCursorListCnt-1;
                        this.filterTodoCursorList[tempIdx+1][this.currentTodoSelector].todoState = "NotWillDo";
                        this.filterTodoCursorList[tempIdx].push(this.filterTodoCursorList[tempIdx+1][this.currentTodoSelector]);
                        for(var i=this.currentTodoSelector; i<this.filterTodoCursorList[tempIdx+1].length-1; i++){
                            this.filterTodoCursorList[tempIdx+1][i] = this.filterTodoCursorList[tempIdx+1][i+1]; 
                            console.log(this.filterTodoCursorList);
                        }
                        this.filterTodoCursorList[tempIdx+1] = this.filterTodoCursorList[tempIdx+1].slice(0,this.filterTodoCursorList[tempIdx].length-1);
                        console.log(this.filterTodoCursorListCnt[1]);
                    }else if(_pressArrowDirection === 'ArrowRight'){
                        let tempIdx = (this.filterTodoCursorListCnt+1 >=2)? 2 : this.filterTodoCursorListCnt+1;
                        this.filterTodoCursorList[tempIdx-1][this.currentTodoSelector].todoState = "willDo";
                        this.filterTodoCursorList[tempIdx].push(this.filterTodoCursorList[tempIdx-1][this.currentTodoSelector]);  
                    }
                    console.log(this.filterTodoCursorList[0]);
                    console.log(this.filterTodoCursorList[1]);
                    console.log(this.filterTodoCursorList[2]);
                    
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
        return(
            <div className="FilterTodo">
            <RenderTodoMemoDiveFilter
            _mode = {this.actionMode}
            _currentTodoSelector = {this.currentTodoSelector}
            _currentMemoSelector = {this.currentMemoSelector}
            _filterTodoCursorListCnt = {this.filterTodoCursorListCnt}
            _filterTodoCursorList = {this.filterTodoCursorList}
            ></RenderTodoMemoDiveFilter>
            </div>
        )
    }
}

export default RenderTodoList;
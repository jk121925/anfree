import { render } from "@testing-library/react";
import React, {Component, memo} from "react";
import TodoMemoDivRender from "./TodoMemoDiv";
import "./TodoElement.css"

// mode, contents
class RenderTodoList extends Component{
    constructor(props){
        super(props);
        //actionMode : writeMode, selectorMode,
        this.actionMode = 'writeMode';
        // writeContentMode : todoList, memoList
        this.writeContentMode = 'todoList';
        this.currentTodoSelector = -1;
        this.currentMemoSelector = -1;
        this.state={
            pressShiftCnt :0,
            pressArrowDirection : ''
        }
    }
    
    swapTodoContents(UpDown){
        var upDownInt = (UpDown === 'up')? -1 :1;
        var updateContentsList = Array.from(this.props._contents);
        var temp = updateContentsList[this.currentTodoSelector];
        updateContentsList[this.currentTodoSelector] = updateContentsList[this.currentTodoSelector+upDownInt];
        updateContentsList[this.currentTodoSelector+upDownInt] = temp;
        this.props.updateContentsTodoList(updateContentsList);
    }

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
            // console.log("RenderTodoList");
            /*
                위아래로 움직이는 기능 구현
            */
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
            }

            /**
             * 메모기능 구현
             * selector Mode 일 때 '/'를 누르면 메모 모드로 들어가기
             * input창이 떠야하고 -> 입력하면 this.props._contents가 업데이트 되어야 함
             * _contents의 자료구조는 list 이어야 하는가? component이어야 하는가?
             * 아니면 javascript 구조로 class를 만들어야 하는가? 고민이네
             * ----> class로 만들어서 memo랑 같이 관리하자 ㅇㅇ 이게 답인듯
             */
            if(this.actionMode === 'selectorMode' && e.key === '/'){
                if(this.writeContentMode === 'todoList') this.writeContentMode = 'memoList';
                else {
                    this.writeContentMode = 'todoList';
                    this.currentMemoSelector = -1;
                }
                e.target.value = "";
                this.forceUpdate();
            }

            /*
                delete 기능 구현
            */
            if(e.shiftKey && e.key === 'Delete'){
                var _deleteContents = Array.from(this.props._contents)
                if(this.actionMode==='selectorMode' && this.writeContentMode==='memoList'){
                    let memolength = _deleteContents[this.currentTodoSelector].memolist.length;
                    if( memolength!==0){
                        for(var i = this.currentMemoSelector; i<memo-1; i++){
                            _deleteContents[this.currentTodoSelector].memolist[i] = 
                            _deleteContents[this.currentTodoSelector].memolist[i+1]
                        }
                        _deleteContents[this.currentTodoSelector].memolist=
                        _deleteContents[this.currentTodoSelector].memolist.slice(0,memolength-1);
                        if(this.currentMemoSelector=== memolength-1){
                            this.currentMemoSelector = this.currentMemoSelector-1;
                        }
                    }
                }else{
                    if(this.props._contents.length ===1){
                        _deleteContents = []
                        this.currentTodoSelector = this.currentTodoSelector-1;
                        this.mode = 'writeMode'
                    }
                    else if(this.props._contents.length !==0){
                        for(var i=this.currentTodoSelector; i<_deleteContents.length-1; i++){
                            _deleteContents[i] = _deleteContents[i+1];
                        }
                        _deleteContents = _deleteContents.slice(0,_deleteContents.length-1);
                        if(this.currentTodoSelector === this.props._contents.length-1){
                            this.currentTodoSelector = this.currentTodoSelector-1;
                        }
                    }
                }
                this.props.updateContentsTodoList(_deleteContents);
            }
            /*
                writeMode vs selectorMode 
                selectorMode면 움직이고 있는 중입니다.
            */
            if(37<=e.keyCode && e.keyCode<=40){
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
                            if(this.currentTodoSelector === 0){
                                this.actionMode ='writeMode'
                            }else{
                                this.currentTodoSelector = (this.currentTodoSelector === 0)? 0 : this.currentTodoSelector-1;
                            }
                        }
                    }
                }
                this.forceUpdate();
            }//end arrow if test
            
            
            if(e.metaKey && e.key ==='Enter'){
                console.log(e);
            }
            
        })
    }



    render(){
        return(
            <TodoMemoDivRender 
            _contents={this.props._contents}
            _mode = {this.actionMode}
            _currentTodoSelector = {this.currentTodoSelector}
            _currentMemoSelector = {this.currentMemoSelector}
            _writeContentMode = {this.writeContentMode}
            ></TodoMemoDivRender>
        )
    }
}

export default RenderTodoList;
import { render } from "@testing-library/react";
import React, {Component, memo} from "react";
import RenderTodoMemoDivReady from "./RenderTodoMemoDivReady";
import * as moveLogic from "./FunctionTodoMemo.js"

// mode, contents
class RenderTodoList extends Component{
    constructor(props){
        super(props);
        //actionMode : writeMode, selectorMode,
        this.actionMode = 'writeMode';
        // writeContentMode : todoList, memoList
        this.writeContentMode = 'todoList';
        // TodoList controll selector
        this.currentTodoSelector = -1;
        this.currentMemoSelector = -1;
        this.currentListIndex = 1;
        // filterTodo cursor
        this.state={
            pressArrowDirection : ''
        }
    }
    
    componentDidMount() {
        window.addEventListener('keydown',(e)=>{
            if(e.shiftKey && 37<=e.keyCode && e.keyCode<=40 && this.actionMode === 'selectorMode'){
                var _pressArrowDirection = e.key;

                if(this.actionMode==='selectorMode' && this.writeContentMode==='memoList'){
                    let memolength = this.props._contents[1][this.currentTodoSelector].memolist.length;
                    if(_pressArrowDirection === 'ArrowDown' && this.currentMemoSelector!=memolength-1){
                        this.props.updateContentsTodoList(moveLogic.swapMemoContents('down',1,this.currentTodoSelector,this.currentMemoSelector,this.props._contents));
                    }else if(_pressArrowDirection==='ArrowUp' && this.currentMemoSelector !=0){
                        this.props.updateContentsTodoList(moveLogic.swapMemoContents('up',1,this.currentTodoSelector,this.currentMemoSelector,this.props._contents));
                    }
                }else{
                    if(_pressArrowDirection === 'ArrowDown' && this.currentTodoSelector!=this.props._contents[1].length-1){
                        this.props.updateContentsTodoList(moveLogic.swapTodoContents('down',1,this.currentTodoSelector,this.props._contents));
                    }else if(_pressArrowDirection==='ArrowUp' && this.currentTodoSelector !=0){
                        this.props.updateContentsTodoList(moveLogic.swapTodoContents('up',1,this.currentTodoSelector,this.props._contents));
                    }
                }
            }

            /**
             * ???????????? ??????
             * selector Mode ??? ??? '/'??? ????????? ?????? ????????? ????????????
             * input?????? ???????????? -> ???????????? this.props._contents??? ???????????? ????????? ???
             * _contents??? ??????????????? list ????????? ?????????? component????????? ??????????
             * ????????? javascript ????????? class??? ???????????? ?????????? ????????????
             * ----> class??? ???????????? memo??? ?????? ???????????? ?????? ?????? ?????????
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
                delete ?????? ??????
            */
            if(e.shiftKey && e.key === 'Delete'){
                var _deleteContents = Array.from(this.props._contents)
                if(this.actionMode==='selectorMode' && this.writeContentMode==='memoList'){
                    if(_deleteContents[1][this.currentTodoSelector].memolist.lengt!==0){
                        _deleteContents = moveLogic.deleteMemoContents(1,this.currentTodoSelector,this.currentMemoSelector,_deleteContents);
                        if(this.currentMemoSelector=== _deleteContents[1][this.currentTodoSelector].memolist.lengt-1){
                            this.currentMemoSelector = this.currentMemoSelector-1;
                        }
                    }
                }else{
                    if(_deleteContents.length ===1){
                        _deleteContents[1] = []
                        this.currentTodoSelector = this.currentTodoSelector-1;
                        this.mode = 'writeMode'
                    }
                    else if(_deleteContents.length !==0){
                        _deleteContents = moveLogic.deleteTodoContents(1,this.currentTodoSelector,_deleteContents);
                        console.log(_deleteContents);
                        if(this.currentTodoSelector === _deleteContents[1].length-1){
                            this.currentTodoSelector = this.currentTodoSelector-1;
                        }
                    }
                }
                this.props.updateContentsTodoList(_deleteContents);
            }
            /*
                writeMode vs selectorMode 
                ???????????? ?????? ???????????? ??????
                ************************* need refactorying **********************
            */
            if(37<=e.keyCode && e.keyCode<=40){
                var _pressArrowDirection = e.key;
                
                if(this.actionMode==='selectorMode' && this.writeContentMode==='memoList'){
                    //controll memo mode
                    let nowMemolist = this.props._contents[1][this.currentTodoSelector].memolist;
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
                        if(this.actionMode==='writeMode' && this.props._contents[1].length!==0){
                            this.currentTodoSelector = 0;
                            this.actionMode = 'selectorMode'
                        }else if(this.actionMode === 'selectorMode'){
                            this.currentTodoSelector = (this.currentTodoSelector === this.props._contents[1].length-1)? this.props._contents[1].length-1 : this.currentTodoSelector+1;                        
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
        })
    }


    render(){
        return(
            <div className='EnterTodo'>
                <RenderTodoMemoDivReady
                _contents={this.props._contents[1]}
                _mode = {this.actionMode}
                _currentTodoSelector = {this.currentTodoSelector}
                _currentMemoSelector = {this.currentMemoSelector}
                _writeContentMode = {this.writeContentMode}
                ></RenderTodoMemoDivReady>
            </div>
        )
    }
}

export default RenderTodoList;
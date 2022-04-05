import { render } from "@testing-library/react";
import React, {Component} from "react";
import TodoMemoDivRender from "./TodoMemoDiv";
import "./TodoElement.css"

// mode, contents
class RenderTodoList extends Component{
    constructor(props){
        super(props);
        this.actionMode = 'writeMode';
        this.writeContentMode = 'todoList';
        this.currentSelector = -1;
        this.state={
            pressShiftCnt :0,
            pressArrowDirection : ''
        }
    }
    
    swapContents(UpDown){
        var upDownInt = (UpDown === 'up')? -1 :1;
        var updateContentsList = Array.from(this.props._contents);
        var temp = updateContentsList[this.currentSelector];
        updateContentsList[this.currentSelector] = updateContentsList[this.currentSelector+upDownInt];
        updateContentsList[this.currentSelector+upDownInt] = temp;
        this.props.updateContentsTodoList(updateContentsList);
    }


    componentDidMount() {
        window.addEventListener('keydown',(e)=>{
            // console.log(e);
            /*
                위아래로 움직이는 기능 구현
            */
            if(e.shiftKey && 37<=e.keyCode && e.keyCode<=40 && this.actionMode === 'selectorMode'){
                var _pressArrowDirection = e.key;
                if(_pressArrowDirection === 'ArrowDown' && this.currentSelector!=this.props._contents.length-1){
                    console.log(this.currentSelector)
                    this.swapContents('down');
                }else if(_pressArrowDirection==='ArrowUp' && this.currentSelector !=0){
                    this.swapContents('up');
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
                else this.writeContentMode = 'todoList';
                this.forceUpdate();
            }

            /*
                delete 기능 구현
            */
            if(e.shiftKey && e.key === 'Delete'){
                var _deleteContents = Array.from(this.props._contents)
                if(this.props._contents.length ===1){
                    _deleteContents = []
                    this.currentSelector = this.currentSelector-1;
                    this.mode = 'writeMode'
                }
                else if(this.props._contents.length !==0){
                    for(var i=this.currentSelector; i<_deleteContents.length-1; i++){
                        _deleteContents[i] = _deleteContents[i+1];
                    }
                    _deleteContents = _deleteContents.slice(0,_deleteContents.length-1);
                    if(this.currentSelector === this.props._contents.length-1){
                        this.currentSelector = this.currentSelector-1;
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
                if(_pressArrowDirection === 'ArrowDown'){
                    if(this.actionMode==='writeMode' && this.props._contents.length!==0){
                        this.currentSelector = 0;
                        this.actionMode = 'selectorMode'
                    }else if(this.actionMode === 'selectorMode'){
                        this.currentSelector = (this.currentSelector === this.props._contents.length-1)? this.props._contents.length-1 : this.currentSelector+1;                        
                    }
                }else if(_pressArrowDirection === 'ArrowUp'){
                    if(this.actionMode === 'selectorMode'){
                        if(this.currentSelector === 0){
                            this.actionMode ='writeMode'
                        }else{
                            this.currentSelector = (this.currentSelector === 0)? 0 : this.currentSelector-1;
                        }
                    }
                }
                console.log(this.props._contents);
                this.forceUpdate();
            }//end arrow if test
            
        })
    }



    render(){
        return(
            <TodoMemoDivRender 
            _contents={this.props._contents}
            _mode = {this.actionMode}
            _currentSelector = {this.currentSelector}
            _writeContentMode = {this.writeContentMode}
            ></TodoMemoDivRender>
            

        )
    }
}

export default RenderTodoList;
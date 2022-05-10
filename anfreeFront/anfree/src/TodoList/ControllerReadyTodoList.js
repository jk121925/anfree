import { render } from "@testing-library/react";
import React, {Component, memo} from "react";
import RenderTodoMemoDivEnter from "./RenderTodoMemoDivEnter";
import RenderTodoMemoDiveFilter from "./RenderTodoMemoDiveFilter";

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
    
    



    /*
    TodoList 위아리 바꾸기
    UpDonw : 위인지 아래인지
    targetList : 지우고자 하는 list => 0,1,2
    currentTodoSelector : 현재 선택된 번호 => 몇번째가 선택 되었는지
    updateFunction : 함수에서 callback 하는 구조 => property에서 받아온 값
    propsContents : property로 부터 받아온 [[],[],[]] 리스트 전체
    */
    swapTodoContents(UpDown,targetList,currentSelector,updateFunction,propsContents){
        // console.log("fuck ready todo swap");
        var upDownInt = (UpDown === 'up')? -1 :1;
        var updateContentsList = Array.from(propsContents);
        var temp = updateContentsList[targetList][currentSelector];
        updateContentsList[targetList][currentSelector] = updateContentsList[targetList][currentSelector+upDownInt];
        updateContentsList[targetList][currentSelector+upDownInt] = temp;
        updateFunction(updateContentsList);
    }

    /*
    Memo 위아래 바꾸기
    UpDonw : 위인지 아래인지
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


    componentDidMount() {
        window.addEventListener('keydown',(e)=>{
            if(e.shiftKey &&e.key === 'Enter'){
                this.props._stage  = this.props._stage +1;
            }
        })
        window.addEventListener('keydown',(e)=>{
            // console.log("RenderTodoList action Mode " , this.actionMode , "writeContent Mode ", this.writeContentMode);
            /*
                위아래로 swap하는 기능 구현
            */
            
            console.log("controllerReadyTodoList : componentDidMount start------------------------")
            console.log(this.props._stage);
            if(e.shiftKey && 37<=e.keyCode && e.keyCode<=40 && this.actionMode === 'selectorMode'){
                var _pressArrowDirection = e.key;

                if(this.actionMode==='selectorMode' && this.writeContentMode==='memoList'){
                    let memolength = this.props._contents[1][this.currentTodoSelector].memolist.length;
                    if(_pressArrowDirection === 'ArrowDown' && this.currentMemoSelector!=memolength-1){
                        this.swapMemoContents('down',1,this.currentTodoSelector,this.currentMemoSelector,this.props.updateContentsTodoList,this.props._contents);
                    }else if(_pressArrowDirection==='ArrowUp' && this.currentMemoSelector !=0){
                        this.swapMemoContents('up',1,this.currentTodoSelector,this.currentMemoSelector,this.props.updateContentsTodoList,this.props._contents);
                    }
                }else{
                    if(_pressArrowDirection === 'ArrowDown' && this.currentTodoSelector!=this.props._contents[1].length-1){
                        this.swapTodoContents('down',1,this.currentTodoSelector,this.props.updateContentsTodoList,this.props._contents);
                    }else if(_pressArrowDirection==='ArrowUp' && this.currentTodoSelector !=0){
                        this.swapTodoContents('up',1,this.currentTodoSelector,this.props.updateContentsTodoList,this.props._contents);
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
                    if(_deleteContents[1][this.currentTodoSelector].memolist.lengt!==0){
                        _deleteContents = this.deleteMemoContents(1,this.currentTodoSelector,this.currentMemoSelector,_deleteContents);
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
                        _deleteContents = this.deleteTodoContents(1,this.currentTodoSelector,_deleteContents);
                        if(this.currentTodoSelector === _deleteContents[1].length-1){
                            this.currentTodoSelector = this.currentTodoSelector-1;
                        }
                    }
                }
                this.props.updateContentsTodoList(_deleteContents);
            }
            /*
                writeMode vs selectorMode 
                위아래로 커서 변경하는 상황
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
        console.log(this.props._stage);
        return(
            <div className='EnterTodo'>
                <RenderTodoMemoDivEnter
                _contents={this.props._contents[1]}
                _mode = {this.actionMode}
                _currentTodoSelector = {this.currentTodoSelector}
                _currentMemoSelector = {this.currentMemoSelector}
                _writeContentMode = {this.writeContentMode}
                ></RenderTodoMemoDivEnter>
            </div>
        )
    }
}

export default RenderTodoList;
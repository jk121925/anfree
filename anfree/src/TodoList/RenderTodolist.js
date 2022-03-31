import { render } from "@testing-library/react";
import React, {Component} from "react";
import "./TodoElement.css"



// mode, contents
class RenderTodoList extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.todoMode = 'writeMode';
        this.currentSelector = 0;
        this.state={
            pressShiftCnt :0,
            pressArrowDirection : '',
            // currentSelector : 0,
            // todoMode : 'wirteTodo'
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
            if(e.shiftKey && 37<=e.keyCode && e.keyCode<=40 && this.todoMode === 'selectorMode'){
                var _pressArrowDirection = e.key;
                if(_pressArrowDirection === 'ArrowDown' && this.currentSelector!=this.props._contents.length-1){
                    console.log(this.currentSelector)
                    this.swapContents('down');
                }else if(_pressArrowDirection==='ArrowUp' && this.currentSelector !=0){
                    this.swapContents('up');
                }
            }
            /*
                writeMode vs selectorMode 
                selectorMode면 움직이고 있는 중입니다.
            */
            if(37<=e.keyCode && e.keyCode<=40){
                var _pressArrowDirection = e.key;
                if(_pressArrowDirection === 'ArrowDown'){
                    if(this.todoMode==='writeMode' && this.props._contents.length!==0){
                        this.currentSelector = 0;
                        this.todoMode = 'selectorMode'
                        this.props.modeChange('selectorMode')
                    }else if(this.todoMode === 'selectorMode'){
                        this.currentSelector = (this.currentSelector === this.props._contents.length-1)? this.props._contents.length-1 : this.currentSelector+1;                        
                    }
                }else if(_pressArrowDirection === 'ArrowUp'){
                    if(this.todoMode === 'selectorMode'){
                        if(this.currentSelector === 0){
                            this.todoMode ='writeMode'
                            this.props.modeChange('selectorMode')
                        }else{
                            this.currentSelector = (this.currentSelector === 0)? 0 : this.currentSelector-1;
                        }
                    }
                }
                this.forceUpdate();
                console.log(this.props._contents);
            }//end arrow if test
            
        })
    }




    makeTodoElementByOrder(selectNumber, mode){
        var renderList =[];
        var renderContainer = this.props._contents;
        var i = 0;
        if(mode === 'selectorMode'){
            while(i<renderContainer.length){
                if(i === selectNumber){
                    renderList.push(<div className="todoMainElement-now" key={renderContainer[i].todolist}>{renderContainer[i].todolist}</div>);
                }else{
                    renderList.push(<div className="todoMainElement" key={renderContainer[i].todolist}>{renderContainer[i].todolist}</div>);
                }
                i=i+1;
            }
        }else{
            //render default -> input todolist
            while(i<renderContainer.length){
                renderList.push(<div className="todoMainElement" key={renderContainer[i].todolist}>{renderContainer[i].todolist}</div>);
                i=i+1;
            }
        }
        return renderList;
    }


    render(){
        var renderList = this.makeTodoElementByOrder(this.currentSelector,this.todoMode);
        // var renderList = [];
        // var renderContainer = this.props._contents;
        // var i =renderContainer.length-1;
        // if(this.props._mode === 'editTodo'){
        //     while(i>=0){
        //         if(i === renderContainer.length-1 && this.props._mode === 'editTodo'){
        //             renderList.push(<div className="todoMainElement-now" key={renderContainer[i].todolist}>{renderContainer[i].todolist}</div>);
        //         }else{
        //             renderList.push(<div className="todoMainElement" key={renderContainer[i].todolist}>{renderContainer[i].todolist}</div>);
                
        //         }
        //         i=i-1;
        //     }
        // }else{
        //     while(i>=0){
        //         renderList.push(<div className="todoMainElement" key={renderContainer[i].todolist}>{renderContainer[i].todolist}</div>);
        //         i=i-1;
        //     }
        // }
        return(
            <div>
                {renderList}
            </div>
            

        )
    }
}

export default RenderTodoList;
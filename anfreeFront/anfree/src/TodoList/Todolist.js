import React, {Component} from "react";
import RenderTodoList from "./RenderTodoList.js"
import RenderTodoInput from "./RenderTodoInput.js";
import StageChangeModal from "./StageChangeModal.js";
import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";



class Todolist extends Component{
    constructor(props){
      super(props);
      // stage Section : EnterTodo, FilterTodo, EraseTodo
      this.stage="EnterTodo";
      // this.contentsMaxIdx =0;
      this.state={
        contents :[],
        stage : "EnterTodo",
        nextbooleaon :false
      }
    }

    componentDidMount(){
      window.addEventListener('keydown',(e)=>{
        if(e.shiftKey && e.key ==='Enter'){
          this.setState({
            stage : "FilterTodo",
            nextbooleaon : !this.state.nextbooleaon

          })
        }
      })
    }


    render(){
      // this.nextStange()
      return(
        <div>
          <StageChangeModal
          _stage={this.state.stage}
          _nextbooleaon={this.state.nextbooleaon}
          ></StageChangeModal>
          <RenderTodoInput 
          _stage = {this.stage}
          _contents = {this.state.contents} 

          updateContents={function(updatelist){
            this.setState({
              contents : updatelist,
            })
          }.bind(this)}></RenderTodoInput>
          <RenderTodoList 
            _contents={this.state.contents}
            _stage = {this.stage}

            updateContentsTodoList={function(updatelist){
              this.setState({
                contents : updatelist
              })
            }.bind(this)}
          ></RenderTodoList>
        </div>
        
      );
    }
  }

  export default Todolist;
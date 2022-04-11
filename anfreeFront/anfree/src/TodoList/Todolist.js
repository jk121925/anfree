import React, {Component} from "react";
import RenderTodoList from "./RenderTodoList.js"
import RenderTodoInput from "./RenderTodoInput.js";
import Modal from "./Modal.js";



class Todolist extends Component{
    constructor(props){
      super(props);
      // stage Section : EnterTodo, FilterTodo, EraseTodo
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

    modalMessage(){
      let returnstr;
      if(this.state.stage==="EnterTodo"){
        returnstr = "Are you sure to go filtering step?";
      }else if(this.state.stage === "FilterTodo"){
        returnstr = "Are you sure to go Erasing step?"
      }
      return returnstr;
    }


    render(){
      // this.nextStange()
      this.modalMessage();
      return(
        <div>
          <Modal
          _nextbooleaon={this.state.nextbooleaon}
          _header={this.state.stage}
          >
            {this.modalMessage()}
          </Modal>


          <RenderTodoInput 
          _stage = {this.state.stage}
          _contents = {this.state.contents} 

          updateContents={function(updatelist){
            this.setState({
              contents : updatelist,
            })
          }.bind(this)}></RenderTodoInput>
          <RenderTodoList 
            _contents={this.state.contents}
            _stage = {this.state.stage}

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
import React, {Component} from "react";
import RenderTodoList from "./RenderTodoList.js"
import RenderTodoInput from "./RenderTodoInput.js";
import Modal from "./Modal.js";



class Todolist extends Component{
    constructor(props){
      super(props);
      // stage Section : EnterTodo, FilterTodo, EraseTodo
      // this.contentsMaxIdx =0;
      this.stageState = ["EnterTodo","FilterTodo","EraseTodo"]
      this.state={
        contents :[],
        stage : 0,
        modalState : false,
        NextPrev : 'Next'
      }
    }

    modalMessage(NextPrev){
      let returnstr;
      if(NextPrev==='Next'){
        returnstr = "Few second after you go to Next step";
      }else if(NextPrev==='Prev'){
        returnstr = "Few second after you go to Previous step"
      }else if(NextPrev ==='None'){
        returnstr = "Cannot move Next or Previous step"
      }
      return returnstr;
    }



    componentDidMount(){
      window.addEventListener('keydown',(e)=>{
        // console.log(e);
        if(e.shiftKey && e.key ==='Enter' && this.state.stage!==2){
          this.setState({
            stage : this.state.stage+1,
            modalState : !this.state.modalState,
            NextPrev : 'Next'
          })
        }
        else if(e.shiftKey && e.key === 'Backspace' && this.state.stage!==0){
          this.setState({
            stage : this.state.stage-1,
            modalState : !this.state.modalState,
            NextPrev : 'Prev'
          })
        }
      })
    }

    


    render(){
      console.log(this.state.stage);
      return(
        <div>
          <Modal
          _modalState={this.state.modalState}
          _header={this.stageState[this.state.stage]}
          
          closeModal={function(closeState){
            this.setState({
              modalState : false
            })
          }.bind(this)}
          >
            {this.modalMessage(this.state.NextPrev)}
          </Modal>


          <RenderTodoInput 
          _stage = {this.stageState[this.state.stage]}
          _contents = {this.state.contents} 

          updateContents={function(updatelist){
            this.setState({
              contents : updatelist,
            })
          }.bind(this)}></RenderTodoInput>
          <RenderTodoList 
            _contents={this.state.contents}
            _stage = {this.stageState[this.state.stage]}

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
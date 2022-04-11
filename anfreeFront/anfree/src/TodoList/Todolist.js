import React, {Component} from "react";
import RenderTodoList from "./RenderTodoList.js"
import RenderTodoInput from "./RenderTodoInput.js";
import Modal from "./Modal.js";



class Todolist extends Component{
    constructor(props){
      super(props);
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
        this.props.stageChange(this.state.stage);

      })
    }

    


    render(){
      return(
        <div>
          
          <Modal
          _modalState={this.state.modalState}
          _header={this.props._stageState[this.state.stage]}
          
          closeModal={function(){
            this.setState({
              modalState : false
            })
          }.bind(this)}
          >
            {this.modalMessage(this.state.NextPrev)}
          </Modal>


          <RenderTodoInput 
          _stage = {this.props._stageState[this.state.stage]}
          _contents = {this.state.contents} 

          updateContents={function(updatelist){
            this.setState({
              contents : updatelist,
            })
          }.bind(this)}></RenderTodoInput>
          
          <RenderTodoList 
            _contents={this.state.contents}
            _stage = {this.props._stageState[this.state.stage]}

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
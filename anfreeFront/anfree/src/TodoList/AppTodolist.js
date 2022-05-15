import React, {Component} from "react";
import ControllerReadyTodoList from "./ControllerReadyTodoList.js"
import ControllerTodoInput from "./ControllerTodoInput.js";
import ControllerFilterTodoList from "./ControllerFilterTodoList.js"
import Modal from "./Modal.js";



class AppTodolist extends Component{
    constructor(props){
      super(props);
      
      this.state={
        contents :[[],[],[]],
        stage : 0,
        modalState : false,
        NextPrev : 'Next',
        defaultActionState : "writeMode"
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
        if(e.shiftKey && e.key ==='Enter' && this.state.stage!==2){
          this.setState({
            stage : this.state.stage+1,
            modalState : !this.state.modalState,
            NextPrev : 'Next',
            defaultActionState : (this.state.stage!==0) ?  "selectorMode" :"writeMode",
          })
        }
        else if(e.shiftKey && e.key === 'Backspace' && this.state.stage!==0){
          this.setState({
            stage : this.state.stage-1,
            modalState : !this.state.modalState,
            NextPrev : 'Prev',
            defaultActionState : (this.state.stage!==0) ? "writeMode" : "selectorMode"
          })
        }
        this.props.stageChange(this.state.stage);

      })
    }

    // componentDidUpdate(){
    //   window.addEventListener('keydown',(e)=>{
    //     console.log(e);
    //   })
    // }

    


    render(){
      // console.log(this.state);
      console.log("apptodoList stage : ",this.state.stage);
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


          {this.state.stage === 0 ? (
            <ControllerTodoInput 
            _stage = {this.props._stageState[this.state.stage]}
            _contents = {this.state.contents} 
  
            updateContents={function(updatelist){
              this.setState({
                contents : updatelist,
              })
            }.bind(this)}></ControllerTodoInput>
          ):null}
          {
            (this.state.stage === 0) ? (
              <ControllerReadyTodoList 
                _contents={this.state.contents}
                // _stage = {this.props._stageState[this.state.stage]}
                _stage = {this.state.stage}
                updateContentsTodoList={function(updatelist){
                  this.setState({
                    contents : updatelist
                  })
                }.bind(this)}
              ></ControllerReadyTodoList>
            ) : (
              (this.state.stage === 1) ? (
                <ControllerFilterTodoList 
                  _contents={this.state.contents}
                  // _stage = {this.props._stageState[this.state.stage]}
                  _stage = {this.state.stage}
                  updateContentsTodoList={function(updatelist){
                    this.setState({
                      contents : updatelist
                    })
                  }.bind(this)}
              ></ControllerFilterTodoList>
              ) : (
                console.log("hi")
              )
            )


          }
        </div>
        
      );
    }
  }

  export default AppTodolist;
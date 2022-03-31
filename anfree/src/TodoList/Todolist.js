import React, {Component} from "react";
import RenderTodoList from "./RenderTodoList.js"
import RenderTodoInput from "./RenderTodoInput.js";



class Todolist extends Component{
    constructor(props){
      super(props);
      this._todoMode = 'writeTodo';
      this.contentsMaxIdx =0;
      this.state={
        contents :[],
        // _todoMode : 'writeTodo',
        _pressCnt : 0
      }
    }
    
    



    render(){
      return(
        <div>
          <RenderTodoInput 
          _contents = {this.state.contents} 
          updateContents={function(updatelist){
            this.contentsMaxIdx = this.contentsMaxIdx+1;
            this.setState({
              contents : updatelist,
            })
          }.bind(this)}></RenderTodoInput>
          <RenderTodoList 
            _contents={this.state.contents}

            modeChange = {function(changeMode){
              console.log("child : todoList call changeMode fucntion " + changeMode)
              this._todoMode = changeMode;
              this.forceUpdate();
            }.bind(this)}

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
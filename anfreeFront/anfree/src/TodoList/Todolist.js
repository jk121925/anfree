import React, {Component} from "react";
import RenderTodoList from "./RenderTodoList.js"
import RenderTodoInput from "./RenderTodoInput.js";



class Todolist extends Component{
    constructor(props){
      super(props);
      this.contentsMaxIdx =0;
      this.state={
        contents :[],
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
import React, {Component} from "react";
class ControllerTodoInput extends Component{
    render(){
        return(
            <input 
                className="todoMemoInput"
                type="text"
                placeholder='add your anxity'
                onKeyPress={function(e){
                    if(e.nativeEvent.key === 'Enter'){
                        e.preventDefault();
                        var addContents = Array.from(this.props._contents);
                        var addTodoElement = {todoState : "ready", eraseState : false, todolist : e.target.value, memolist : []}
                        addContents.push(addTodoElement)
                        this.props.updateContents(addContents);
                        e.target.value = "";
                    }
                }.bind(this)
            }
          ></input>
        )
    }
}

export default ControllerTodoInput;
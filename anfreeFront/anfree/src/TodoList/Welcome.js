import React, {Component} from "react";

class Welcome extends Component{
  constructor(props){
    super(props);
    this.state={
      title : 'Anfree',
      encourage : 'we want to free from anxity'
    }
  }


    render(){
      return(
        <div>
          <h1>{this.state.title}</h1>
          <div>{this.state.encourage}</div>     
        </div>
      );
    }
  }

export default Welcome;
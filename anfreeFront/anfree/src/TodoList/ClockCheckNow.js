import React, {Component} from "react";
import Clock from 'react-live-clock';
class ClockCheckNow extends Component{
    render(){
        return(
        <div>
            <Clock format={'HH:mm:ss'} ticking = {true} />
        </div>
        
        );
    }
}

export default ClockCheckNow;
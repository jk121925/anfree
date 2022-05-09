import React, {Component} from "react";
import Clock from 'react-live-clock';
class AppClockCheckNow extends Component{
    render(){
        return(
        <div>
            <Clock format={'HH:mm:ss'} ticking = {true} />
        </div>
        
        );
    }
}

export default AppClockCheckNow;
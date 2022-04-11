import React from "react";

export default function StageChangeModal({_stage,_nextbooleaon}){
    console.log(_stage, _nextbooleaon);
    let ModalDiv;
    if(_nextbooleaon){
        ModalDiv = <div> Do you want to go next stage?</div>
    }
    return(
        <div>
            {ModalDiv}
        </div>
    )
} 
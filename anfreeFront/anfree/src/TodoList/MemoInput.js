import React, {Component} from "react";

// class MemoInput extends Component{
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return(
//             <input
//                 type = 'text'
//                 placeholder="add Memo!"
//                 onKeyDown={function(e){
//                     // console.log(e);
//                     if(e.nativeEvent.key === 'Enter'){
//                         e.preventDefault();
//                         var addMemo = this.props._memoContents;
//                         addMemo.memoList.push(e.target.value);
//                         // console.log(addMemo);
//                         this.props.callUpperUpdateFunc(addMemo);
//                         e.target.value = "";
//                     }
//                 }.bind(this)}
//             >
//             </input>
//         )
//     }
// }


function MemoInput({_memoContents,_memoIdx}){
    console.log(_memoContents,_memoIdx);
    return(
        <input
        type = 'text'
            placeholder="add Memo!"
            onKeyDown={function(e){
                if(e.nativeEvent.key === 'Enter'){
                    e.preventDefault();
                    
                }
            }.bind(this)}
        >
        </input>
    );
};
export default MemoInput
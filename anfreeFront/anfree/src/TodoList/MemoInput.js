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


function MemoInput({_memoContents,_memoIdx,_setterContents}){
    console.log(_memoContents,_memoIdx,_setterContents);
    return(
        <input
        type = 'text'
            placeholder="add Memo!"
            onKeyDown={function(e){
                if(e.nativeEvent.key === 'Enter'){
                    e.preventDefault();
                    var resetMemo = Array.from(_memoContents);
                    resetMemo[_memoIdx].memolist.push(e.target.value);
                    _setterContents(resetMemo);
                    e.target.value=""
                }
            }.bind(this)}
        >
        </input>
    );
};
export default MemoInput
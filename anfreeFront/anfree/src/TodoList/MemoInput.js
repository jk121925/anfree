import React from "react";

function MemoInput({_memoContents,_memoIdx,_setterContents}){
    return(
        <input
        className="todoMemoInput-memo"
        type = 'text'
            placeholder="add Memo!"
            onKeyPress={function(e){
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
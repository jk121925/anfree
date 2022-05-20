import React from "react";

function RenderMemoInput({renderTodoList,listSelector,todoSelector,memoSelector,memoUpdate}){
    return(
        <input
        className="todoMemoInput-memo"
        type = 'text'
            placeholder="add Memo!"
            onKeyPress={function(e){
                if(e.nativeEvent.key === 'Enter'){
                    e.preventDefault();
                    var resetMemo = Array.from(renderTodoList);
                    resetMemo[listSelector][todoSelector].memolist.push(e.target.value);
                    memoUpdate(resetMemo);
                    e.target.value=""
                }
            }.bind(this)}
        >
        </input>
    );
};
export default RenderMemoInput
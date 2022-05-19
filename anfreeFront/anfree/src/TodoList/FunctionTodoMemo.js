    
    /*
    TodoList 위아리 바꾸기
    UpDonw : 위인지 아래인지
    targetList : 지우고자 하는 list => 0,1,2
    currentTodoSelector : 현재 선택된 번호 => 몇번째가 선택 되었는지
    updateFunction : 함수에서 callback 하는 구조 => property에서 받아온 값
    propsContents : property로 부터 받아온 [[],[],[]] 리스트 전체
    */
    export const swapTodoContents =(UpDown,targetList,currentSelector,propsContents)=>{
        var upDownInt = (UpDown === 'up')? -1 :1;
        var updateContentsList = Array.from(propsContents);
        var temp = updateContentsList[targetList][currentSelector];
        updateContentsList[targetList][currentSelector] = updateContentsList[targetList][currentSelector+upDownInt];
        updateContentsList[targetList][currentSelector+upDownInt] = temp;
        // updateFunction(updateContentsList);
        return updateContentsList;
    }

    /*
    Memo 위아래 바꾸기
    UpDonw : 위인지 아래인지
    targetList : 지우고자 하는 list => 0,1,2
    currentTodoSelector : 현재 선택된 번호 => 몇번째가 선택 되었는지
    currentMemoSelector : 현재 선택된 메모 번호
    updateFunction : 함수에서 callback 하는 구조 => property에서 받아온 값
    propsContents : property로 부터 받아온 [[],[],[]] 리스트 전체
    */
    export const swapMemoContents = (UpDown,targetList,currentTodoSelector,currentMemoSelector,propsContents)=>{
        let memoIdx = currentMemoSelector;
        let todoIdx = currentTodoSelector;
        var upDownInt = (UpDown === 'up')? -1 :1;
        var updateContentsList = Array.from(propsContents);
        var temp = updateContentsList[targetList][todoIdx].memolist[memoIdx];
        updateContentsList[targetList][todoIdx].memolist[memoIdx] = updateContentsList[targetList][todoIdx].memolist[memoIdx + upDownInt];
        updateContentsList[targetList][todoIdx].memolist[memoIdx+upDownInt] = temp;
        // updateFunction(updateContentsList);
        return updateContentsList;
    }

    /*
    MemoList 삭제
    targetList : 지우고자 하는 list => 0,1,2
    currentTodoSelector : 현재 선택된 번호 => 몇번째가 선택 되었는지
    currentMemoSelector : 현재 선택된 메모 번호
    propsContents : property로 부터 받아온 [[],[],[]] 리스트 전체
    */
    export const deleteMemoContents =(targetList,currentTodoSelector,currentMemoSelector,propsContents)=>{
        let memolength = propsContents[targetList][currentTodoSelector].memolist.length;
        for(var i = currentMemoSelector; i<propsContents[targetList][currentTodoSelector].length-1; i++){
            propsContents[targetList][currentTodoSelector].memolist[i] = 
            propsContents[targetList][currentTodoSelector].memolist[i+1]
        }
        propsContents[targetList][currentTodoSelector].memolist=
        propsContents[targetList][currentTodoSelector].memolist.slice(0,memolength-1);
        return propsContents;
    }

    // 함수에는 해당되는 기능만을 집중해서 구현하자 -> 함수는 필요한 것만!
    /*
    TodoList 삭제
    targetList : 지우고자 하는 list => 0,1,2
    currentTodoSelector : 현재 선택된 번호 => 몇번째가 선택 되었는지
    propsContents : property로 부터 받아온 [[],[],[]] 리스트 전체
    */
    export const deleteTodoContents=(targetList,currentTodoSelector,propsContents)=>{
        for(var i=currentTodoSelector; i<propsContents[targetList].length-1; i++){
            propsContents[targetList][i] = propsContents[targetList][i+1];
        }
        propsContents = propsContents[targetList].slice(0,propsContents.length-1);
        return propsContents;
    }
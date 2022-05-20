    

    //swap, delete은 list를 같이 반환
    //그냥 move는 todoSelector와 listSelector를 반환
    export const swapUpAndDown =(todoSelector,listSelector,pressedKey,todoList)=>{
        let swapTodoList = Array.from(todoList);
        let NextTodoSelector = (pressedKey.key ==='ArrowUp')? todoSelector-1: todoSelector +1;
        //넘어가는지 확인 해줘야 한다.
        if(NextTodoSelector <0 || NextTodoSelector >todoList[listSelector].length-1){
            return null;
        } 
        let temp = swapTodoList[listSelector][todoSelector] = swapTodoList[listSelector][todoSelector];
        swapTodoList[listSelector][todoSelector] = swapTodoList[listSelector][NextTodoSelector];
        swapTodoList[listSelector][NextTodoSelector] = temp;
        return [listSelector,NextTodoSelector, swapTodoList];
    }

    //state변경까지해야한다.
    //check는 큰 function에서 진행
    export const swapRightAndLeft = (todoSelector,listSelector,pressedKey,todoList)=>{
        let swapTodoList = Array.from(todoList);
        let nextTodoSelector = 0 ; let nextListSelctor;
        if(pressedKey.key === 'ArrowRight'){
            nextListSelctor = (listSelector !=2)? nextListSelctor+1 : nextListSelctor;
        }else if(pressedKey.key === 'ArrowLeft'){
            nextListSelctor = (listSelector !=0)? nextListSelctor-1 : nextListSelctor;
        } 
        //상태 재설정
        swapTodoList[listSelector][todoSelector].todoState = (nextListSelctor === 0) ? 'WILLNOTDO': (nextListSelctor ===1) ? 'READY' : "WILLDO";
        //타겟 todo에 추가
        swapTodoList[nextListSelctor].push(swapTodoList[listSelector][todoSelector]);
        //원본 제거
        deleteTodoContents(listSelector,todoSelector,swapTodoList);
        //변경된 위치의 todoSelector 재설정
        nextTodoSelector = swapTodoList[nextListSelctor].length-1;
        return [nextListSelctor,nextTodoSelector,swapTodoList];   
    }
    /*
    TodoList 위아리 바꾸기
    UpDonw : 위인지 아래인지
    targetList : 지우고자 하는 list => 0,1,2
    currentTodoSelector : 현재 선택된 번호 => 몇번째가 선택 되었는지
    updateFunction : 함수에서 callback 하는 구조 => property에서 받아온 값
    propsContents : property로 부터 받아온 [[],[],[]] 리스트 전체
    */
    export const swapTodoContents =(todoSelector,listSelector, pressedKey, nowStage, todoList)=>{
        if(nowStage ===0){
            if(pressedKey.key === 'ArrowUp' || pressedKey.key ==='ArrowDown'){
                return swapUpAndDown(todoSelector,listSelector,pressedKey,todoList);
            }
            return null;
        }
        else if(nowStage ===1){
            if(pressedKey.key === 'ArrowUp' || pressedKey.key ==='ArrowDown'){
                return swapUpAndDown(todoSelector,listSelector,pressedKey,todoList);
            }
            else if(pressedKey.key === 'ArrowRight' && nowStage+1 <=2 || pressedKey.key === 'ArrowLeft' && nowStage-1 >=0){
                return swapRightAndLeft(todoSelector,listSelector,pressedKey,todoList)
            }
        }
        else if(nowStage ===2){
            if(pressedKey.key === 'ArrowUp' || pressedKey.key ==='ArrowDown'){
                return swapUpAndDown(todoSelector,listSelector,pressedKey,todoList);
            }
            return null;
        }
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
    export const swapMemoContents = (pressedKey,listSelector,todoSelector,memoSelector,todoList)=>{
        let memoIdx = memoSelector;
        let todoIdx = todoSelector;
        let upDownInt = (pressedKey.key === 'ArrowUp')? -1 :1;
        let updateContentsList = Array.from(todoList);
        let temp = updateContentsList[listSelector][todoIdx].memolist[todoList];
        updateContentsList[listSelector][todoIdx].memolist[memoIdx] = updateContentsList[listSelector][todoIdx].memolist[memoIdx + upDownInt];
        updateContentsList[listSelector][todoIdx].memolist[memoIdx+upDownInt] = temp;
        // updateFunction(updateContentsList);
        return [listSelector,todoSelector, updateContentsList];
    }

    export const moveMemoContents = (pressedKey, listSelector, todoSelector,memoSelector,todoList)=>{
        let upDownInt = (pressedKey.key ==='ArrowUp')? -1 : 1;
        memoSelector = (memoSelector +1 <todoList[listSelector][todoSelector].memolist.length && memoSelector-1 >-1)?
            memoSelector + upDownInt : memoSelector;
        return memoSelector;
    }


    /*
    MemoList 삭제
    targetList : 지우고자 하는 list => 0,1,2
    currentTodoSelector : 현재 선택된 번호 => 몇번째가 선택 되었는지
    currentMemoSelector : 현재 선택된 메모 번호
    propsContents : property로 부터 받아온 [[],[],[]] 리스트 전체
    */
    export const deleteMemoContents =(listSelector,todoSelector,memoSelector,todoList)=>{
        let deleteTodoList = Array.from(todoList);
        let memolength = deleteTodoList[listSelector][todoSelector].memolist.length;
        for(var i = memoSelector; i<deleteTodoList[listSelector][todoSelector].length-1; i++){
            deleteTodoList[listSelector][todoSelector].memolist[i] = 
            deleteTodoList[listSelector][todoSelector].memolist[i+1]
        }
        deleteTodoList[listSelector][todoSelector].memolist=
        deleteTodoList[listSelector][todoSelector].memolist.slice(0,memolength-1);
        return [listSelector,todoSelector, deleteTodoList];
    }

    // 함수에는 해당되는 기능만을 집중해서 구현하자 -> 함수는 필요한 것만!
    /*
    TodoList 삭제
    targetList : 지우고자 하는 list => 0,1,2
    currentTodoSelector : 현재 선택된 번호 => 몇번째가 선택 되었는지
    propsContents : property로 부터 받아온 [[],[],[]] 리스트 전체
    */
    export const deleteTodoContents=(listSelector,todoSelector,todoList)=>{
        console.log(todoList)
        let deleteTodoList = Array.from(todoList);
        let nextTodoSelector = (todoSelector == deleteTodoList[listSelector].length-1)? todoSelector-1 : todoSelector;
        for(var i=todoSelector; i<deleteTodoList[listSelector].length-1; i++){
            deleteTodoList[listSelector][i] = deleteTodoList[listSelector][i+1];
        }
        console.log(deleteTodoList)
        deleteTodoList[listSelector] = deleteTodoList[listSelector].slice(0,todoList[listSelector].length-1);
        console.log(listSelector,nextTodoSelector, deleteTodoList)
        return [listSelector,nextTodoSelector, deleteTodoList];
    }

    


    export const moveUpAndDown = (todoSelector,listSelector,pressedKey,todoList)=>{
        let nextTodoSelector;
        if(pressedKey.key === 'ArrowUp'){
            nextTodoSelector = (todoSelector !=0) ? todoSelector-1 : todoSelector;
        }
        else{
            nextTodoSelector = (todoSelector !=todoList[listSelector].length-1)? todoSelector+1 : todoSelector;
        }
        return [listSelector,nextTodoSelector,todoList]
    }

    

    //return next TodoSelector from pressedKey
    //return [listSelector, todoSelector]
    export const moveTodoContents = (todoSelector,listSelector, pressedKey, nowStage, todoList)=>{
        if(nowStage == 0){
            if(pressedKey.key === 'ArrowUp' || pressedKey.key === 'ArrowDown'){
                return moveUpAndDown(todoSelector,listSelector,pressedKey,todoList);
            }
            
        }
        else if(nowStage === 1){
            if(pressedKey.key === 'ArrowUp' || pressedKey.key ==='ArrowDown'){
                return moveUpAndDown(todoSelector,listSelector,pressedKey,todoList);
            }else if(pressedKey.key =='ArrowRight' || pressedKey.key == 'ArrowLeft'){
                let nextTodoSelector = 0 ; let nextListSelctor;
                if(pressedKey.key === 'ArrowRight'){
                    nextListSelctor = (listSelector !=2)? nextListSelctor+1 : nextListSelctor;
                }else if(pressedKey.key === 'ArrowLeft'){
                    nextListSelctor = (listSelector !=0)? nextListSelctor-1 : nextListSelctor;
                }
                return [nextListSelctor, nextTodoSelector]
            }
        }
        else if(nowStage === 2){
            if(pressedKey.key === 'ArrowUp' || pressedKey.key === 'ArrowDown'){
                return moveUpAndDown(todoSelector,listSelector,pressedKey,todoList);
            }
        }
    }
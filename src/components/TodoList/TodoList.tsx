import { useEffect, useRef, useState } from "react";
import FirebaseService from "../../common/FirebaseService";
import Header from "../Header";
import { useContextDispatch } from "../../Context";

const PRE_TODO_ID = "td_";

/**
 * 할 일 목록 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/12/05
 */

const TodoList = (props: any) => {
  const [receivedData, setReceivedData] = useState<Array<any>>();
  const [todoList, setTodoList] = useState<Array<any>>();
  const [completedTodoList, setCompletedTodoList] = useState<Array<any>>();

  const [newTodo, setNewTodo] = useState<string>();
  const [completeList, setCompleteList] = useState<Array<any>>([]);
  const [deleteList, setDeleteList] = useState<Array<any>>([]);
  const dispatch = useContextDispatch();
  const seq = useRef<number>(0);

  /**
   * 개선안. (실시간 데이터 전송 -> 일괄 데이터 전송)
   * 실시간으로 데이터를 set 하고 fetch 하는 방식이 아닌,
   * 기존에 의도했던데로, 마지막에 일괄 처리 하는 것으로 진행
   *
   * - 데이터가 한번에 두번까지는 통신량 차이가 적으나, 그 이상으로 데이터를 set 또는 fetch 한다면, 통신량이 많아 진다고 판단
   * - 버튼 하나 만들고 일괄 처리 로직 생성
   * - 그외 일괄처리 시점 추가 분석
   */

  useEffect(() => {
    !receivedData && setTodos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  /**
   * 새로운 할 일을 저장
   * todoList 에 추가
   *
   * @returns
   */
  const onClickResistTodoButton = async () => {
    if (!todoList || !newTodo) {
      return;
    }

    const tempTodo = {
      text: newTodo,
      isCompleted: false,
      id: PRE_TODO_ID + ++seq.current,
    };
    const tempTodoList = [...todoList];

    tempTodoList.push(tempTodo);

    setTodoList(tempTodoList);
    setNewTodo("");
  };

  /**
   * 할 일을 완료 또는, 삭제
   * 완료 시, 대상 항목을 todoList -> completedTodoList 로 이동
   * 삭제 시, 대상 항목을 completedTodoList에서 제거
   *
   * @param targetTodo 대상 메모
   * @todos 분할 계획 및 함수 정리
   */
  const onClickDeleteButton = (targetTodo: any) => {
    if (!targetTodo.isCompleted) {
      const tempTodoList = todoList?.filter(
        (todo) => todo.id !== targetTodo.id
      );
      const tempCompleteTodoList = [...(completedTodoList ?? [])];
      tempCompleteTodoList.push({ ...targetTodo, isCompleted: true });
      setTodoList(tempTodoList);
      setCompletedTodoList(tempCompleteTodoList);
    } else {
      const tempCompleteTodoList = completedTodoList?.filter(
        (todo) => todo.id !== targetTodo.id
      );
      setCompletedTodoList(tempCompleteTodoList);
    }
  };

  /**
   * 체크박스 체크된 항목 todoList -> completedTodoList 로 이동
   */
  const onClickBatchCompleteButton = () => {
    const tempTodoList = todoList?.filter(
      (todo) => !completeList.includes(todo)
    );
    const tempCompletedTodoList = new Array<any>();

    (completedTodoList ?? []).concat(completeList).forEach((item) => {
      const completedTodo = { ...item, isCompleted: true };
      tempCompletedTodoList.push(completedTodo);
    });

    setTodoList(tempTodoList);
    setCompletedTodoList(tempCompletedTodoList);
    setCompleteList([]);
  };

  /**
   * 체크박스 체크된 항목 completedTodoList에서 제거
   */
  const onClickBatchDeleteButton = () => {
    const tempCompletedTodoList = (completedTodoList ?? []).filter(
      (item) => !deleteList.includes(item)
    );

    setCompletedTodoList(tempCompletedTodoList);
  };

  /**
   * 기존 저장된 할 일 목록 세팅
   */
  const setTodos = async () => {
    const result = await FirebaseService.fetchTodoList();

    const isNotCompletedResult = (result as Array<any>).filter(
      (item) => !item.isCompleted
    );
    const isCompletedResult = (result as Array<any>).filter(
      (item) => item.isCompleted
    );

    let lastId = 0;
    (result as Array<any>).forEach((item) => {
      const id = Number.parseInt((item.id as string).replace(PRE_TODO_ID, ""));

      if (lastId < id) {
        lastId = id;
      }
    });

    seq.current = lastId;

    dispatch({ type: "SET_TODO_COUNT", todoCount: result.length });

    setTodoList(isNotCompletedResult);
    setCompletedTodoList(isCompletedResult);
    setReceivedData(result);
  };

  /**
   * Enter 감지 및 상태 등록
   */
  const onPressKeyDownEnter = (e: any) => {
    if (e.key === "Enter") {
      onClickResistTodoButton();
    }
  };

  /**
   * 현 상태 일괄 저장
   * 기존 Firebase 데이터 전소
   * 현 State 값을 Friebase 값으로 저장
   */
  const saveTodoList = async () => {
    if (!receivedData) {
      return;
    }

    await FirebaseService.batchDeleteTodo(receivedData);

    const sendData = todoList?.concat(completedTodoList);

    if (!sendData) {
      return;
    }

    await FirebaseService.batchSetTodo(sendData);
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>할 일 목록</h2>
      <div className="box_todo">
        <div>
          <input
            type="text"
            value={newTodo}
            onKeyPress={onPressKeyDownEnter}
            onChange={(e: any) => {
              setNewTodo(e.target.value);
            }}
          />
          <button onClick={onClickResistTodoButton}>입력</button>
          <button onClick={saveTodoList}> 저장</button>
        </div>
        <div className="todo-list">
          <h4>할 일 목록</h4>
          {todoList?.map((todo, index) => {
            return (
              <div key={"todo_div_" + index}>
                <label>
                  <input
                    type="checkbox"
                    checked={completeList?.includes(todo)}
                    onClick={(e) => {
                      const { checked } = e.target as HTMLInputElement;
                      if (checked) {
                        const temp = [...completeList];
                        temp.push(todo);
                        setCompleteList(temp);
                      } else {
                        const temp = completeList?.filter(
                          (item) => item.id !== todo.id
                        );
                        setCompleteList(temp);
                      }
                    }}
                  />
                  <span>{todo.text}</span>
                </label>
                <button onClick={() => onClickDeleteButton(todo)}>
                  {"Ok"}
                </button>
              </div>
            );
          })}
        </div>
        <hr />
        <button onClick={onClickBatchCompleteButton}>선택된 항목 완료</button>
        <hr />
        <div className="todo-list">
          <h4>완료한 할 일</h4>
          {completedTodoList?.map((todo, index) => {
            return (
              <div key={"todo_completed_" + index}>
                <label>
                  <input
                    type="checkbox"
                    checked={deleteList?.includes(todo)}
                    onClick={(e) => {
                      const { checked } = e.target as HTMLInputElement;
                      if (checked) {
                        const temp = [...deleteList];
                        temp.push(todo);
                        setDeleteList(temp);
                      } else {
                        const temp = deleteList?.filter(
                          (item) => item.id !== todo.id
                        );
                        setDeleteList(temp);
                      }
                    }}
                  />
                  <span className={"item-completed"}>{todo.text}</span>
                </label>
                <button
                  className={"button-completed"}
                  onClick={() => onClickDeleteButton(todo)}
                >
                  {"X"}
                </button>
              </div>
            );
          })}
          <hr />
          <button onClick={onClickBatchDeleteButton}>선택된 항목 삭제</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

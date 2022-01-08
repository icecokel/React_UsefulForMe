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
  const [todoList, setTodoList] = useState<Array<any>>();
  const [completedTodoList, setCompletedTodoList] = useState<Array<any>>();

  const [newTodo, setNewTodo] = useState<string>();
  const [completeList, setCompleteList] = useState<Array<any>>([]);
  const dispatch = useContextDispatch();
  const seq = useRef<number>(0);
  const needFetch = useRef<boolean>(true);
  const isRunBatch = useRef<boolean>(false);

  useEffect(() => {
    needFetch.current && setTodos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

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
    needFetch.current = false;
    setTodoList(isNotCompletedResult);
    setCompletedTodoList(isCompletedResult);
  };

  /**
   * 새로운 할 일을 Firebase에 저장
   * @returns
   */
  const onClickInsertTodoButton = async () => {
    if (!todoList || !newTodo) {
      return;
    }
    needFetch.current = true;
    await FirebaseService.setTodo(
      { text: newTodo, isCompleted: false },
      PRE_TODO_ID + ++seq.current
    );
    setTodos();
    setNewTodo("");
  };

  /**
   * 할 일을 완료 또는, 삭제
   * 완료 시 할 일의 isCompleted항목 수정
   * 삭제 시 데이터 Firebase에서 제거
   *
   * @param todo 대상 메모
   */
  const onClickDeleteButton = async (todo: any) => {
    needFetch.current = true;
    if (!todo.isCompleted) {
      await FirebaseService.setTodo(
        { text: todo.text, isCompleted: true },
        todo.id
      );
    } else {
      await FirebaseService.deleteTodo(todo.id);
    }

    setTodos();
  };

  const onClickBatchCompleteButton = async () => {
    if (isRunBatch.current) {
      alert("배치진행중");
      return;
    }
    const temp = [] as any;

    completeList?.forEach((item) => {
      item.isCompleted = true;
      temp.push(item);
    });

    isRunBatch.current = true;
    await FirebaseService.batchSetTodo(temp);
    isRunBatch.current = false;
    await setTodos();
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
            onChange={(e: any) => {
              setNewTodo(e.target.value);
            }}
          />
          <button onClick={onClickInsertTodoButton}> 입력</button>
        </div>
        <div className="todo-list">
          <h4>할 일 목록</h4>
          {todoList?.map((todo, index) => {
            return (
              <div key={"todo_div_" + index}>
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={completeList?.includes(todo)}
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
                  <input type="checkbox" />
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
          <button>선택된 항목 삭제</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

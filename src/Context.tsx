import React, { useReducer, useContext, createContext, Dispatch } from "react";

const initData = {
  memoCount: 0,
};

// 상태를 위한 타입
type State = {
  memoCount: number;
};

// 모든 액션들을 위한 타입
type Action = { type: "SET_TODO_COUNT"; todoCount: number };

// 디스패치를 위한 타입 (Dispatch 를 리액트에서 불러올 수 있음), 액션들의 타입을 Dispatch 의 Generics로 설정
// Context 만들기
const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

// 리듀서
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TODO_COUNT":
      return {
        ...state,
        memoCount: action.todoCount, // count가 자동완성되며, number 타입인걸 알 수 있습니다.
      };

    default:
      throw new Error("Unhandled action");
  }
}

// SampleProvider 에서 useReduer를 사용하고
// SampleStateContext.Provider 와 SampleDispatchContext.Provider 로 children 을 감싸서 반환합니다.
export function Provider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initData);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useContextState() {
  const state = useContext(StateContext);
  if (!state) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useContextDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}

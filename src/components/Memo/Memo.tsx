import { useEffect, useRef, useState } from "react";
import FirebaseService from "../../common/FirebaseService";
import Header from "../Header";
import { useContextDispatch } from "../../Context";

const PRE_MEMO_ID = "memo_";
/**
 * 메모 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/12/05
 */
const Memo = (props: any) => {
  const [memoList, setMemoList] = useState<Array<any>>();
  const [completedMemoList, setCompletedMemoList] = useState<Array<any>>();

  const [newMemo, setNewMemo] = useState<string>();
  const dispatch = useContextDispatch();
  const seq = useRef<number>(0);
  const needFetch = useRef<boolean>(true);

  useEffect(() => {
    needFetch.current && setMemos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  /**
   * 기존 저장된 메모 목록 세팅
   */
  const setMemos = async () => {
    const result = await FirebaseService.fetchMemo();

    const isNotCompletedResult = (result as Array<any>).filter(
      (item) => !item.isCompleted
    );
    const isCompletedResult = (result as Array<any>).filter(
      (item) => item.isCompleted
    );

    let lastId = 0;
    (result as Array<any>).forEach((item) => {
      const id = Number.parseInt((item.id as string).replace(PRE_MEMO_ID, ""));

      if (lastId < id) {
        lastId = id;
      }
    });

    seq.current = lastId;

    dispatch({ type: "SET_MEMO_COUNT", memoCount: result.length });
    needFetch.current = false;
    setMemoList(isNotCompletedResult);
    setCompletedMemoList(isCompletedResult);
  };

  /**
   * 새로운 메모를 Firebase에 저장
   * @returns
   */
  const onClickInsertMemoButton = () => {
    if (!memoList || !newMemo) {
      return;
    }
    needFetch.current = true;
    FirebaseService.setMemo(
      { text: newMemo, isCompleted: false },
      PRE_MEMO_ID + ++seq.current
    );
    setMemos();
    setNewMemo("");
  };

  /**
   * 메모를 완료 또는, 삭제
   * 완료 시 메모의 isCompleted항목 수정
   * 삭제 시 데이터 Firebase에서 제거
   *
   * @param memo 대상 메모
   */
  const onClickDeleteButton = (memo: any) => {
    needFetch.current = true;
    if (!memo.isCompleted) {
      FirebaseService.setMemo({ text: memo.text, isCompleted: true }, memo.id);
    } else {
      FirebaseService.deleteMemo(memo.id);
    }

    setMemos();
  };
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>메모</h2>
      <div className="box_memo">
        <div>
          <input
            type="text"
            value={newMemo}
            onChange={(e: any) => {
              setNewMemo(e.target.value);
            }}
          />
          <button onClick={onClickInsertMemoButton}> 입력</button>
        </div>
        <div className="memo-list">
          <h4>남은 메모</h4>
          {memoList?.map((memo) => {
            return (
              <div>
                <label>
                  <input type="checkbox" />
                  <span>{memo.text}</span>
                </label>
                <button onClick={() => onClickDeleteButton(memo)}>
                  {"Ok"}
                </button>
              </div>
            );
          })}
        </div>
        <hr />
        <button>선택 완료</button>
        <hr />
        <div className="memo-list">
          <h4>완료한 메모</h4>
          {completedMemoList?.map((memo) => {
            return (
              <div>
                <label>
                  <input type="checkbox" />
                  <span className={"item-completed"}>{memo.text}</span>
                </label>
                <button
                  className={"button-completed"}
                  onClick={() => onClickDeleteButton(memo)}
                >
                  {"X"}
                </button>
              </div>
            );
          })}
          <hr />
          <button>선택 삭제</button>
        </div>
      </div>
    </div>
  );
};

export default Memo;

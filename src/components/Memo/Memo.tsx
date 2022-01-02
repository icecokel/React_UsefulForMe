import { useEffect, useRef, useState } from "react";
import FirebaseService from "../../common/FirebaseService";
import Header from "../Header";
import { useContextDispatch } from "../../Context";

/**
 * 메모 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/12/05
 */
const Memo = (props: any) => {
  const [memoList, setMemoList] = useState<Array<any>>();
  const [newMemo, setNewMemo] = useState<string>();
  const dispatch = useContextDispatch();
  const seq = useRef<number>(0);
  const needFetch = useRef<boolean>(true);

  useEffect(() => {
    needFetch.current && setMemos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  // 예상 기능,
  /**
   * 현재 DB 상태에 따라서 화면에 뿌려줌.
   * 입력 버튼을 누리면, STATE를 수정해서 화면에 뿌려줌 (DB에 저장 안함)
   * 마지막에 저장 버튼을 누르면 (현재 상태를 DB에 저장)
   *
   * - 통신 횟수를 줄이기 위함.
   *
   * firebase에서 가져온갯수만큼 useRef 수를 증가 시킴
   * - useRef를 순번으로 사용하기 위함.
   *
   */

  /**
   * 기존 저장된 메모 목록 세팅
   */
  const setMemos = async () => {
    const result = await FirebaseService.fetchMemo();

    seq.current = result.length;
    dispatch({ type: "SET_MEMO_COUNT", memoCount: result.length });
    setMemoList(result);
    needFetch.current = false;
  };

  const saveMemo = () => {
    if (!memoList || !newMemo) {
      return;
    }
    needFetch.current = true;
    FirebaseService.saveMemo(
      { text: newMemo, isDeleted: false },
      "memo_" + ++seq.current
    );
    setNewMemo("");
  };

  const onClickDeleteButton = (memo: any, index: number) => {
    needFetch.current = true;
    if (!memo.isDeleted) {
      FirebaseService.saveMemo({ text: memo.text, isDeleted: true }, memo.id);
    } else {
      // 지우는 로직
    }
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
          <button onClick={saveMemo}> 입력</button>
        </div>
        <div>
          {memoList?.map((memo, index) => {
            return (
              <div>
                <span>{memo.text}</span> {memo.isDeleted && "isDeleted"}
                <button onClick={() => onClickDeleteButton(memo, index)}>
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Memo;

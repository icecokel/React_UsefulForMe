import { useEffect, useState } from "react";
import { transpileModule } from "typescript";
import FirebaseService from "../../common/FirebaseService";
import Header from "../Header";

/**
 * 메모 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/12/05
 */
const Memo = (props: any) => {
  const [memoList, setMemoList] = useState<Array<any>>();
  const [newMemo, setNewMemo] = useState<string>();
  useEffect(() => {
    setMemos();
  }, []);

  // 예상 기능,
  /**
   * 현재 DB 상태에 따라서 화면에 뿌려줌.
   * 입력 버튼을 누리면, STATE를 수정해서 화면에 뿌려줌 (DB에 저장 안함)
   * 마지막에 저장 버튼을 누르면 (현재 상태를 DB에 저장)
   * 따라서 항목별 제거가 가능해야함.
   *
   * - 통신 횟수를 줄이기 위함.
   *
   */

  /**
   * 기존 저장된 메모 목록 세팅
   */
  const setMemos = async () => {
    const result = await FirebaseService.fetchMemo();

    setMemoList(result);
  };

  const saveMemo = () => {
    if (!memoList || !newMemo) {
      return;
    }
    const temp = memoList.slice();

    temp.push({ text: newMemo });
    console.log(temp);

    setMemoList(temp);
    setNewMemo("");
  };

  const saveDb = () => {
    FirebaseService.saveMemo("TEST!!");
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
                <span>{memo.text}</span>
                <button onClick={() => {}}> delete</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Memo;

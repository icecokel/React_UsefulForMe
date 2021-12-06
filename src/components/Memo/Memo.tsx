import { useEffect, useState } from "react";
import FirebaseService from "../../common/FirebaseService";
import Header from "../Header";

/**
 * 메모 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/12/05
 */
const Memo = (props: any) => {
  const [memoList, setMemoList] = useState<Array<string>>();
  const [newMemo, setNewMemo] = useState<string>();
  useEffect(() => {
    setMemos();
  });

  /**
   * 기존 저장된 메모 목록 세팅
   */
  const setMemos = async () => {
    const result = await FirebaseService.fetchMemo();

    setMemoList(result);
  };

  const setNewText = (e: any) => {
    setNewMemo(e.target.value);
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>메모</h2>
      <div className="box_memo">
        <div>
          <input type="text" value={newMemo} onChange={setNewText} />
          <button>입력</button>
        </div>
        <div>
          {memoList?.map((memo: any) => {
            return <div>{memo.text}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Memo;

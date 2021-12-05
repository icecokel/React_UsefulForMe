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

  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>메모</h2>
      <div className="box_memo">
        {memoList?.map((memo: any) => {
          return <div>{memo.text}</div>;
        })}
      </div>
    </div>
  );
};

export default Memo;

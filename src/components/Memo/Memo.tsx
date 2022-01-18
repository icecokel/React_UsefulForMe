import Header from "../Header";
import FirebaseService from "../../common/FirebaseService";
import { useEffect, useState } from "react";
/**
 * 메모 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/12/05
 */
const Memo = (props: any) => {
  const [memoList, setMemoList] = useState<Array<any>>();
  const [currentMemo, setCurrentMemo] = useState<any>();

  useEffect(() => {
    !memoList && setMemo();
    console.log(memoList);
  });

  const setMemo = async () => {
    const tempList = await FirebaseService.fetchMemoList();

    if (!currentMemo) {
      setCurrentMemo(tempList[0]);
    }

    setMemoList(tempList);
  };
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>메모</h2>
      <div className="box_memo">
        <div className="box_title">
          <ol>
            {memoList?.map((memo) => {
              return (
                <li
                  onClick={() => {
                    setCurrentMemo(memo);
                  }}
                >
                  {memo.title}
                </li>
              );
            })}
          </ol>
        </div>
        {currentMemo && (
          <div className="box_contents">
            <div className="box_memo_title">
              <input type="text" value={currentMemo.title} />
              <div>
                <span>
                  작성일 :
                  {new Date(currentMemo.createAt.seconds).toLocaleString()}
                </span>
                {console.log(currentMemo.updateAt)}
                <span>
                  수정일 :
                  {new Date(currentMemo.updateAt.seconds).toLocaleString()}
                </span>
              </div>
            </div>

            <div>{currentMemo.contents}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Memo;

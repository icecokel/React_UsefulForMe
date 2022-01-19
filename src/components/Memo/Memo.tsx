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
    console.log(currentMemo.createAt.toDate());
  });

  const setMemo = async () => {
    const tempList = await FirebaseService.fetchMemoList();

    if (!currentMemo) {
      setCurrentMemo(tempList[0]);
    }

    setMemoList(tempList);
  };

  const formatTime = (time: Date) => {
    return `
    ${time.getFullYear().toString().slice(-2)}/
    ${("0" + (time.getMonth() + 1)).slice(-2)}/${("0" + time.getDate()).slice(
      -2
    )} ${("0" + time.getHours()).slice(-2)}:${("0" + time.getMinutes()).slice(
      -2
    )}`;
    // ("0" + time.getMonth()).slice(-2)
  };
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>메모</h2>
      <div className="box_memo">
        <div className="box_title">
          <label>새로운 메모 만들기</label>
          <ol>
            {memoList?.map((memo) => {
              return (
                <li
                  className={
                    memo.title === currentMemo.title
                      ? "item-title-selected"
                      : ""
                  }
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
                <span>작성일 :{formatTime(currentMemo.createAt.toDate())}</span>
                <br />
                <span>수정일 :{formatTime(currentMemo.updateAt.toDate())}</span>
              </div>
            </div>
            <hr />
            <textarea cols={100} rows={50}>
              {currentMemo.contents}
            </textarea>
            <hr />
            <div>
              <button>저장</button>
              <button>삭제</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Memo;

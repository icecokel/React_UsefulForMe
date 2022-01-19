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

  const formatTime = (time: Date) => {
    return `
    ${time.getFullYear().toString().slice(-2)}/
    ${
      time.getMonth() + 1
    }/${time.getDate()} ${time.getHours()}:${time.getSeconds()}`;
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
                  작성일 :{formatTime(new Date(currentMemo.createAt.seconds))}
                </span>
                <br />
                <span>
                  수정일 :{formatTime(new Date(currentMemo.updateAt.seconds))}
                </span>
              </div>
            </div>
            <textarea cols={100} rows={50}>
              {currentMemo.contents}
            </textarea>
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

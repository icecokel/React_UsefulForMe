import Header from "../Header";
import FirebaseService from "../../common/FirebaseService";
import { useEffect, useRef, useState } from "react";
import { Timestamp } from "firebase/firestore/lite";

interface MEMO {
  title: string;
  contents: string;
  createAt: any;
  updateAt: any;
  id: string;
}

const PRE_MEMO_ID = "memo_";

/**
 * 메모 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/12/05
 */
const Memo = (props: any) => {
  const [memoList, setMemoList] = useState<Array<MEMO>>();
  const [currentMemo, setCurrentMemo] = useState<MEMO>();
  const memoSeq = useRef<number>(0);

  useEffect(() => {
    !memoList && setMemo();
  });

  const setMemo = async () => {
    const tempList = await FirebaseService.fetchMemoList();

    if (!currentMemo) {
      setCurrentMemo(tempList[0]);
    }

    memoSeq.current = tempList.length;
    setMemoList(tempList);
  };

  const createNewMemo = () => {
    const newMemo: MEMO = {
      title: "",
      contents: "",
      createAt: undefined,
      updateAt: undefined,
      id: "",
    };

    setCurrentMemo(newMemo);
  };

  const updateMemo = async () => {
    if (!currentMemo) {
      return;
    }

    if (currentMemo.id) {
      await FirebaseService.setMemo(currentMemo, currentMemo.id);
    } else {
      const now = new Date();
      const temp = { ...currentMemo, createAt: now, updateAt: now };

      await FirebaseService.setMemo(temp, PRE_MEMO_ID + ++memoSeq.current);
      setMemo();
    }
  };

  const formatTime = (time: Date) => {
    return `
    ${time.getFullYear().toString().slice(-2)}/
    ${("0" + (time.getMonth() + 1)).slice(-2)}/${("0" + time.getDate()).slice(
      -2
    )} ${("0" + time.getHours()).slice(-2)}:${("0" + time.getMinutes()).slice(
      -2
    )}`;
  };
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>메모</h2>
      <div className="box_memo">
        <div className="box_title">
          <label onClick={createNewMemo}>새로운 메모 만들기</label>
          <ol>
            {memoList?.map((memo, index) => {
              return (
                <li
                  key={"title_" + index}
                  className={
                    currentMemo && memo.title === currentMemo.title
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
              <input
                type="text"
                value={currentMemo.title}
                placeholder="제목을 입력해주세요."
                onChange={(e) =>
                  setCurrentMemo({ ...currentMemo, title: e.target.value })
                }
              />
              <div>
                <span>
                  작성일 :
                  {currentMemo.createAt
                    ? formatTime(currentMemo.createAt.toDate())
                    : ""}
                </span>
                <br />
                <span>
                  수정일 :
                  {currentMemo.updateAt
                    ? formatTime(currentMemo.updateAt.toDate())
                    : ""}
                </span>
              </div>
            </div>
            <hr />
            <textarea
              cols={100}
              rows={50}
              value={currentMemo.contents}
              placeholder="내용을 입력해주세요."
              onChange={(e) =>
                setCurrentMemo({ ...currentMemo, contents: e.target.value })
              }
            ></textarea>
            <hr />
            <div>
              <button onClick={updateMemo}>저장</button>
              <button>삭제</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Memo;

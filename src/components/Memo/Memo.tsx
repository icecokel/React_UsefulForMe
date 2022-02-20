import Header from "../Header";
import FirebaseService from "../../common/FirebaseService";
import {
  ChangeEvent,
  ChangeEventHandler,
  EventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const [currentMemo, setCurrentMemo] = useState<any>();
  const memoSeq = useRef<number>(0);

  useEffect(() => {
    !memoList && setMemo();
  });

  /**
   * 새 메모
   * 현재 메모를 비움
   */
  const onClickCreateNewMemo = () => {
    const newMemo: MEMO = {
      title: "",
      contents: "",
      createAt: undefined,
      updateAt: undefined,
      id: "",
    };

    setCurrentMemo(newMemo);
  };

  /**
   * 메모저장
   * 기존 메모 - 업데이트
   * 신규 메모 - 생성
   * @returns
   */
  const onClickUpdateMemo = async () => {
    if (!currentMemo) {
      return;
    }

    if (currentMemo.id) {
      await FirebaseService.setMemo(currentMemo, currentMemo.id);
    } else {
      const now = Timestamp.fromDate(new Date());
      const temp = { ...currentMemo, createAt: now, updateAt: now };

      await FirebaseService.setMemo(temp, PRE_MEMO_ID + ++memoSeq.current);
      setMemo();
    }
  };

  /**
   * 현재 메모 삭제
   *
   * @returns
   */
  const onClickDeleteMemo = async () => {
    if (!currentMemo) {
      return;
    }
    FirebaseService.deleteMemo(currentMemo?.id);
    setMemo();
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

  /**
   * 기존 저장된 메모 목록 세팅
   */
  const setMemo = async () => {
    const tempList = await FirebaseService.fetchMemoList();

    let maxSeq = 0;

    (tempList as Array<MEMO>).forEach((item) => {
      maxSeq =
        Number.parseInt(item.id.replace(PRE_MEMO_ID, "")) > maxSeq
          ? Number.parseInt(item.id.replace(PRE_MEMO_ID, ""))
          : maxSeq;
    });

    memoSeq.current = maxSeq + 1;

    if (!currentMemo) {
      setCurrentMemo(tempList[0]);
    }
    setMemoList(tempList);
  };

  const onChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    const temp = { ...currentMemo, [name]: value };
    setCurrentMemo(temp);
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>메모</h2>
      <div className="box_memo">
        <div className="box_title">
          <label onClick={onClickCreateNewMemo}>새로운 메모 만들기</label>
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
                name="title"
                onChange={onChange}
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
              name="contents"
              onChange={onChange}
            ></textarea>
            <hr />
            <div>
              <button onClick={onClickUpdateMemo}>저장</button>
              <button onClick={onClickDeleteMemo}>삭제</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Memo;

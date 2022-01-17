import Header from "../Header";

/**
 * 메모 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/12/05
 */
const Memo = (props: any) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>메모</h2>
      <div className="box_memo">
        <div className="box_title">
          <ol>
            <li>제목1</li>
            <li>제목2</li>
            <li>제목3</li>
            <li>제목4</li>
          </ol>
        </div>
        <div className="box_contents">
          <div className="box_memo_title">
            <input type="text" value={"제목1"} />
            <div>
              <span>작성일 : </span>
              <span>수정일 : </span>
            </div>
          </div>

          <div>내용 1</div>
        </div>
      </div>
    </div>
  );
};

export default Memo;

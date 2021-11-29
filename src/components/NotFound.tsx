import { useHistory } from "react-router";
import { PagePath } from "../common/enum";
const Error = () => {
  const history = useHistory();
  const goToMain = () => {
    history.push(PagePath.Main);
  };
  return (
    <div className="box_error">
      <div>
        <h2>!! 404 에러 !!</h2>
        <p>페이지를 찾을 수 없습니다.</p>
        <button onClick={goToMain}>메인으로 가기</button>
      </div>
    </div>
  );
};

export default Error;

import Header from "../Header";
import FirebaseService from "../../common/FirebaseService";

const LENGUAGE_LIST = ["word_jp"];

/**
 * 단어퀴즈 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/11/30
 */
const WordQuiz = (props: any) => {
  const fetchWords = async (lenguageIndex: number) => {
    const result = await FirebaseService.fetchWordQuiz(
      LENGUAGE_LIST[lenguageIndex]
    );

    console.log(result);
  };
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>단어 퀴즈</h2>
      <div className="box_wordQuiz">
        <div>
          <h4>언어</h4>
          <button onClick={() => fetchWords(0)}>일어</button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default WordQuiz;

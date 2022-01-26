import Header from "../Header";
import FirebaseService from "../../common/FirebaseService";
import { useState } from "react";

const LENGUAGE_LIST = ["word_jp"];

enum MODE {
  game,
  config,
  addWord,
  main,
}

/**
 * 단어퀴즈 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/11/30
 */
const WordQuiz = (props: any) => {
  const [mode, setMode] = useState<MODE>(MODE.main);
  // const fetchWords = async (lenguageIndex: number) => {
  //   const result = await FirebaseService.fetchWordQuiz(
  //     LENGUAGE_LIST[lenguageIndex]
  //   );
  // };
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h2>단어 퀴즈</h2>
        <button onClick={() => setMode(MODE.main)}>메뉴로 돌아가기</button>
      </div>
      <div className="box_wordQuiz">
        {mode === MODE.main && (
          <div className="box_wordQuiz_main">
            <div>현재 설정 정보</div>
            <button onClick={() => setMode(MODE.game)}> 게임 시작하기</button>
            <button onClick={() => setMode(MODE.config)}> 게임 설정</button>
            <button onClick={() => setMode(MODE.addWord)}>단어 추가하기</button>
          </div>
        )}

        {mode === MODE.config && <WordGameConfig />}
        {mode === MODE.addWord && <AddWord />}
        {mode === MODE.game && <WordGame />}
        {/* <div>
          <h4>언어</h4>
          <button onClick={() => fetchWords(0)}>일어</button>
        </div>
        <div></div> */}
      </div>
    </div>
  );
};

const WordGameConfig = (props: any) => {
  return <div> 게임 설정</div>;
};

const AddWord = (props: any) => {
  return <div> 단어 추가</div>;
};

const WordGame = (props: any) => {
  return <div> 게임시작</div>;
};

export default WordQuiz;

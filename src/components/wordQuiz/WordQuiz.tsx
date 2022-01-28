import Header from "../Header";
import FirebaseService from "../../common/FirebaseService";
import { useRef, useState } from "react";

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
  const [words, setWords] = useState<Array<any>>([]);
  const [mode, setMode] = useState<MODE>(MODE.main);

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

        {mode === MODE.config && <WordGameConfig setWords={setWords} />}
        {mode === MODE.addWord && <AddWord />}
        {mode === MODE.game && <WordGame />}
      </div>
    </div>
  );
};

const WordGameConfig = (props: any) => {
  const [config, setConfig] = useState<any>();
  const wordCount = useRef<number>(0);
  const fetchWords = async (lenguageIndex: number) => {
    const result = await FirebaseService.fetchWordQuiz(
      LENGUAGE_LIST[lenguageIndex]
    );

    // TODO 결과 값을 Array 형식으려 변환

    wordCount.current = (result as Array<any>).length;

    props.setWords(result);
  };
  return (
    <div>
      <h4>게임 설정</h4>
      <div>
        <h4>언어</h4>
        <button onClick={() => fetchWords(0)}>일어</button>
      </div>
      <div>준비된 단어 수 : {wordCount.current}</div>

      <div>
        <input
          type="number"
          placeholder="진행할 단어 수 "
          onChange={(e) => {
            setConfig({ ...config, wordCount: e.target.value });
          }}
        />
      </div>

      <button>설정</button>
    </div>
  );
};

const AddWord = (props: any) => {
  return (
    <div>
      <h4>단어 추가</h4>
      <div>
        <input type="text" placeholder="단어" />
        <input type="text" placeholder="발음" />
        <input type="text" placeholder="뜻" />
      </div>
    </div>
  );
};

const WordGame = (props: any) => {
  return <div> 게임시작</div>;
};

export default WordQuiz;

import React from "react";
import Header from "../Header";

/**
 * 단어퀴즈 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/11/30
 */
const WordQuiz = (props: any) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>단어 퀴즈</h2>
      <div className="box_wordQuiz"></div>
    </div>
  );
};

export default WordQuiz;

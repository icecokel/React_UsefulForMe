import { useState, useRef } from "react";
import Header from "../Header";
import GemeHelper from "./GameHelper";

const BLOCK_LIST = ["J", "L", "S", "O", "Z", "T", "I"];
const MIN_VALUE = 0;
const MAX_VALUE = 6;

// const BOARD_COLUMNS = 12;
// const BOARD_ROWS = 20;

const Tetris = (props: any) => {
  const [nextBlock, setNextBlock] = useState<Array<string>>([]);
  const [gameStatus, setGameState] = useState<string>("Ready");

  GemeHelper.moveBlock(false);
  const createBlock = () => {
    const blockIndex = Math.floor(Math.random() * MAX_VALUE + MIN_VALUE);
    return <Block kind={BLOCK_LIST[blockIndex]}></Block>;
  };

  const onClickStart = () => {
    setGameState("Start");
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>게임 - 테트리스 {gameStatus}</h2>

      <button onClick={createBlock}>테스트</button>
      <button onClick={onClickStart}> Start</button>
      <div>
        <ScoreBoard />
        <div>게임 메인</div>
        <NextBlock next={nextBlock} />
      </div>
    </div>
  );
};

const ScoreBoard = (props: any) => {
  return <div>스코어 보드</div>;
};

const NextBlock = (props: { next: Array<string> }) => {
  return <div>넥스트 블록</div>;
};

const Block = (props: { kind: string }) => {
  return <div></div>;
};

export default Tetris;

import Header from "../Header";

const BlockList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Tetris = (props: any) => {
  const createBlock = () => {
    const blockIndex = Math.floor(Math.random() * 10);
    console.log(blockIndex);
  };
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>게임 - 테트리스</h2>
      <button onClick={createBlock}>111</button>
      <div>
        <ScoreBoard />
        <div>게임 메인</div>
        <NextBlock />
      </div>
    </div>
  );
};

const ScoreBoard = (props: any) => {
  return <div>스코어 보드</div>;
};

const NextBlock = (props: any) => {
  return <div>넥스트 블록</div>;
};

const Block = (kind: number) => {
  return <div></div>;
};

export default Tetris;

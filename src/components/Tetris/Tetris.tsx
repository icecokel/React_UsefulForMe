import Header from "../Header";

const Tetris = (props: any) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>게임 - 테트리스</h2>
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

export default Tetris;

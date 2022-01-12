import Header from "../Header";

const Tetris = (props: any) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>게임 - 테트리스</h2>
      <div>
        <div>스코어</div>
        <div>게임 메인</div>
        <div>넥스트 블록</div>
      </div>
    </div>
  );
};

export default Tetris;

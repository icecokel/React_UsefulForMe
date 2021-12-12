import Header from "../Header";

const SuspectList = [
  { carRacer: "카레이서" },
  { reporter: "여기자" },
  { ceo: "K그룹 회장" },
  { boxer: "복싱선수" },
  { proGamer: "프로게이머" },
  { carsinoOwner: "카지노 사장" },
];

const PlaceList = [
  { parkinglot: "주차장" },
  { hetel: "호텔" },
  { casino: "카지노" },
  { pension: "펜션" },
  { cafe: "커피숍" },
  { movie: "극장" },
  { restaurant: "레스토랑" },
  { convenienceStore: "편의점" },
  { park: "공원" },
];

const ToolList = [
  { poison: "독약" },
  { hammer: "망치" },
  { gun: "권총" },
  { banana: "바나나 껍질" },
  { knife: "칼" },
  { flowerPot: "화분" },
];

const BoardGame = (props: any) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>보드게임 - 추리왕</h2>
      <div></div>
    </div>
  );
};

export default BoardGame;

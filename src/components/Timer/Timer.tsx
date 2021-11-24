import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useState } from "react";

const SECOND_OF_MINUTE = 60;
const SECOND_OF_HOUR = 3600;

const quickSettingList = [
  { name: "1시간 반", time: SECOND_OF_HOUR + 30 * SECOND_OF_MINUTE },
  { name: "1시간", time: SECOND_OF_HOUR },
  { name: "30분", time: 30 * SECOND_OF_MINUTE },
  { name: "10분", time: 10 * SECOND_OF_MINUTE },
];

const Timer = (props: any) => {
  const [sec, setSec] = useState<number>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {}, [sec, isPlaying]);

  const createQuickButton = () => {
    const buttonList = [] as any;

    quickSettingList.forEach((item) => {
      buttonList.push(
        <button
          className="quick_button"
          id={"quick_" + item.time}
          onClick={() => {
            setSec(item.time);
            setIsPlaying(true);
          }}
        >
          {item.name}
        </button>
      );
    });

    return buttonList;
  };

  const renderTime = ({ remainingTime }: any) => {
    if (remainingTime === 0) {
      return <div className="timer">설정 중..</div>;
    }
    const hour = Math.floor(remainingTime / SECOND_OF_HOUR);
    const minute = Math.floor(
      (remainingTime - SECOND_OF_HOUR * hour) / SECOND_OF_MINUTE
    );
    const second = Math.floor(remainingTime % SECOND_OF_MINUTE);

    return (
      <div className="timer">
        <div className="text">남은 시간</div>
        <div className="value">
          {hour > 0 && hour + "시간 "}
          {minute > 0 && minute + "분 "}
          {second} 초
        </div>
      </div>
    );
  };

  const setCustomTime = () => {
    const customHour = document.querySelector(
      "#customHour"
    ) as HTMLInputElement;
    const customMinute = document.querySelector(
      "#customMinute"
    ) as HTMLInputElement;
    const customSecond = document.querySelector(
      "#customSecond"
    ) as HTMLInputElement;

    const customTime =
      Number.parseInt(customHour.value) * SECOND_OF_HOUR +
      Number.parseInt(customMinute.value) * SECOND_OF_MINUTE +
      Number.parseInt(customSecond.value);

    setSec(customTime);
    setIsPlaying(true);
  };

  return (
    <div>
      <h2>타이머</h2>

      <div className="box_timer">
        <div className="circle_timer">
          <CountdownCircleTimer
            isPlaying={isPlaying}
            key={sec}
            duration={sec ?? 0}
            size={500}
            strokeWidth={50}
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <div className="box_setting">
          <div className="">
            <label>조작</label>
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
              }}
            >
              {isPlaying ? "일시정지" : "재개"}
            </button>

            <button>반복</button>
          </div>
          <div className="custom">
            <label>커스텀 설정</label>
            <div>
              <input type="number" id="customHour" />시
              <input type="number" id="customMinute" />분
              <input type="number" id="customSecond" />초
              <button onClick={setCustomTime}>시작</button>
            </div>
          </div>
          <div className="quick">
            <label>빠른 설정</label>
            <div>{createQuickButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timer;

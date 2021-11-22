import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useState } from "react";

const SECOND_OF_MINUTE = 60;
const SECOND_OF_HOUR = 3600;
const SECOND_OF_DAY = 86400;

const quickSettingList = [
  { name: "1시간", time: SECOND_OF_HOUR },
  { name: "30분", time: 30 * SECOND_OF_MINUTE },
  { name: "10분", time: 10 * SECOND_OF_MINUTE },
];

const Timer = (props: any) => {
  const [sec, setSec] = useState<number>(SECOND_OF_HOUR);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timerTag, setTimerTag] = useState<any>();

  const createQuickSettingButton = () => {
    const buttonList = [] as any;

    quickSettingList.forEach((item) => {
      buttonList.push(
        <button
          className="quick_button"
          id={"quick_" + item.time}
          onClick={() => {
            setSec(item.time);
            setIsPlaying(true);
            createCircleTimeer();
          }}
        >
          {item.name}
        </button>
      );
    });

    return buttonList;
  };

  const createCircleTimeer = () => {
    setTimerTag("");
    const timer = (
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={sec}
        size={400}
        strokeWidth={50}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33],
        ]}
      >
        {({ remainingTime }: any) => {
          if (!remainingTime) {
            return;
          }
          // return Math.round((remainingTime / sec) * 100);

          return remainingTime;
        }}
      </CountdownCircleTimer>
    );
    setTimerTag(timer);
  };

  useEffect(() => {}, [sec, isPlaying]);
  return (
    <div>
      <h2>타이머</h2>

      <div className="box_timer">
        <div className="timer">{timerTag}</div>
        <div className="box_setting">
          <div className="custom">
            <label>커스텀 설정</label>
            <div>
              <input type="text" />시
              <input type="text" />분
              <input type="text" />초<button>시작</button>
            </div>
          </div>
          <div className="quick">
            <label>빠른 설정</label>
            <div>{createQuickSettingButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timer;

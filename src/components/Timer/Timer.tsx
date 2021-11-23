import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useState } from "react";

const SECOND_OF_MINUTE = 60;
const SECOND_OF_HOUR = 3600;

const quickSettingList = [
  { name: "1시간", time: SECOND_OF_HOUR },
  { name: "30분", time: 30 * SECOND_OF_MINUTE },
  { name: "10분", time: 10 * SECOND_OF_MINUTE },
];

const Timer = (props: any) => {
  const [sec, setSec] = useState<number>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {}, []);

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
      return <div className="timer">Too lale...</div>;
    }

    return (
      <div>
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  useEffect(() => {}, [sec, isPlaying]);
  return (
    <div>
      <h2>타이머</h2>

      <div className="box_timer">
        <div className="timer">
          <CountdownCircleTimer
            isPlaying
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

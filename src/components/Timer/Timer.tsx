import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useState } from "react";

const SECOND_OF_MINUTE = 60;
const SECOND_OF_HOUR = 3600;
const SECOND_OF_DAY = 86400;

const Timer = (props: any) => {
  const [sec, setSec] = useState<number>(SECOND_OF_HOUR);

  useEffect(() => {
    console.log(sec);
  }, [sec]);
  return (
    <div>
      <div>
        <h2>타이머</h2>
        <PieTimer sec={sec} />
      </div>
      <div className="box_timer">
        <div className="timer"></div>
        <div className="box_setting">
          <div className="custom">커스텀 설정</div>
          <div className="quick">
            빠른 설정
            <button
              onClick={() => {
                setSec(SECOND_OF_HOUR);
              }}
            >
              1시간
            </button>
            <button
              onClick={() => {
                setSec(30 * SECOND_OF_MINUTE);
              }}
            >
              30분
            </button>
          </div>
        </div>
      </div>
      <div>
        <img src="images/timer.jpg" alt="tt" />
      </div>
    </div>
  );
};

const PieTimer = (props: any) => {
  return (
    <>
      <div>
        <CountdownCircleTimer
          isPlaying
          duration={props.sec}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (!remainingTime) {
              return;
            }
            return Math.round((remainingTime / props.sec) * 100);
          }}
        </CountdownCircleTimer>
      </div>
    </>
  );
};

export default Timer;

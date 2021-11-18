import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useState } from "react";

const SECOND_OF_MINUTE = 60;
const SECOND_OF_HOUR = 3600;
const SECOND_OF_DAY = 86400;

const Timer = (props: any) => {
  const [sec, setSec] = useState<number>(SECOND_OF_HOUR);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {}, [sec, isPlaying]);
  return (
    <div>
      <div>
        <h2>타이머</h2>

        <div className="box_timer">
          <div className="timer">
            <CountdownCircleTimer
              isPlaying={isPlaying}
              duration={sec}
              size={500}
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
                return Math.round((remainingTime / sec) * 100);
              }}
            </CountdownCircleTimer>
          </div>
        </div>
        <div className="box_setting">
          <div className="custom">커스텀 설정</div>
          <div className="quick">
            빠른 설정
            <button
              onClick={() => {
                setSec(SECOND_OF_HOUR);
                setIsPlaying(true);
              }}
            >
              1시간
            </button>
            <button
              onClick={() => {
                setSec(30 * SECOND_OF_MINUTE);
                setIsPlaying(true);
              }}
            >
              30분
            </button>
            <button
              onClick={() => {
                setSec(10 * SECOND_OF_MINUTE);
                setIsPlaying(true);
              }}
            >
              10분
            </button>
          </div>
        </div>
      </div>
      {/* <div>
        <img src="images/timer.jpg" alt="tt" />
      </div> */}
    </div>
  );
};
export default Timer;

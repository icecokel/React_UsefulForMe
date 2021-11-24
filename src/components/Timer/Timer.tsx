import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useState } from "react";
import Header from "../Header";

const SECOND_OF_MINUTE = 60;
const SECOND_OF_HOUR = 3600;

const quickSettingList = [
  { name: "1시간 반", time: SECOND_OF_HOUR + 30 * SECOND_OF_MINUTE },
  { name: "1시간", time: SECOND_OF_HOUR },
  { name: "30분", time: 30 * SECOND_OF_MINUTE },
  { name: "10분", time: 10 * SECOND_OF_MINUTE },
];

/**
 * 타이머 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/11/24
 *
 * @todo 커스텀 시간 수기 입력으로 한계값 초과가능 수정 필요
 */
const Timer = (props: any) => {
  const [sec, setSec] = useState<number>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isEnableRestart, setIsEnableRestart] = useState<boolean>(false);

  useEffect(() => {}, [sec, isPlaying]);

  /**
   * 남은 시간 표시
   *
   * @param param 남은 시간 (초)
   * @returns 남은 시간 (시, 분, 초)
   */
  const renderTime = ({ remainingTime }: any) => {
    if (remainingTime === 0) {
      return (
        <div className="timer">
          <div className="text">
            {isEnableRestart ? "1.5초 후 재시작 합니다." : "설정 대기중 .."}
          </div>
        </div>
      );
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

  /**
   * 커스텀 시간 설정
   */
  const onClickSetCutomerButton = () => {
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
      inputElementValueToNumber(customHour) * SECOND_OF_HOUR +
      inputElementValueToNumber(customMinute) * SECOND_OF_MINUTE +
      inputElementValueToNumber(customSecond);

    setSec(customTime);
    setIsPlaying(true);
  };

  /**
   * 태그의 값의 자료형을 number로 변환
   *
   * @param target 인풋 태그
   * @returns
   * 자료형 number 인 태그의 값
   * 태그의 값이 음수일 경우 양수로 반환
   * 태그의 값이 없을 경우 0을 반환
   */
  const inputElementValueToNumber = (target: HTMLInputElement) => {
    if (!target.value) {
      return 0;
    }

    if (Number.parseInt(target.value) < 0) {
      return Number.parseInt(target.value) * -1;
    }

    return Number.parseInt(target.value);
  };

  /**
   * 빠른 설정 버튼 생성 메소드
   *
   * @returns 빠른 설정 버튼 컴포넌트
   */
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
  return (
    <div>
      <div>
        <Header />
      </div>
      <h2>타이머</h2>

      <div className="box_timer">
        <div className="circle_timer">
          <CountdownCircleTimer
            isPlaying={isPlaying}
            key={sec}
            duration={sec ?? 0}
            size={500}
            strokeWidth={50}
            onComplete={() => {
              return [isEnableRestart, 1500];
            }}
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
          <div className="box_contoller">
            <h4>조작</h4>
            <div>
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                }}
              >
                {isPlaying ? "일시정지" : "재개"}
              </button>

              <button
                onClick={() => {
                  setIsEnableRestart(!isEnableRestart);
                }}
              >
                {isEnableRestart ? "반복해제" : "반복"}
              </button>
            </div>
          </div>
          <div className="custom">
            <h4>커스텀 설정</h4>
            <div>
              <input type="number" id="customHour" max={23} />시
              <input type="number" id="customMinute" max={59} />분
              <input type="number" id="customSecond" max={59} />초
              <button onClick={onClickSetCutomerButton}>시작</button>
            </div>
          </div>
          <div className="quick">
            <h4>빠른 설정</h4>
            <div>{createQuickButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timer;

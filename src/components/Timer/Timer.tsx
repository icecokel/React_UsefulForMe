const Timer = (props: any) => {
  return (
    <div>
      <div>
        <h2>타이머</h2>
      </div>
      <div className="box_timer">
        <div className="timer">시계부</div>
        <div className="box_setting">
          <div className="custom">커스텀 설정</div>
          <div className="quick">빠른 설정</div>
        </div>
      </div>
      <div>
        <img src="images/timer.jpg" alt="tt" />
      </div>
    </div>
  );
};

export default Timer;

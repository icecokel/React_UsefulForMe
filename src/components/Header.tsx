import { useEffect, useState } from "react";
import PageInfo from "../common/PageInfoUtil";

/**
 * 헤더 및 네비게이션 컴포넌트
 *
 * @author LEESANGMIN
 * @since 2021-11-25
 * @todo 네비게이션 디자인, 좌측 상단 구상 후 구현
 */
const Header = () => {
  return (
    <div className="box_header">
      <div>구상중</div>
      <div className="box_btn">
        {PageInfo.getPageInfo().map((item) => {
          return (
            <button
              className="btn_header"
              onClick={() => {
                window.location.href = item.path;
              }}
            >
              {item.title}
            </button>
          );
        })}
      </div>
      <div>
        <Clock />
      </div>
    </div>
  );
};

export default Header;

const Clock = () => {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    setInterval(() => {
      const now = new Date();

      const hours = ("0" + now.getHours()).slice(-2);
      const minutes = ("0" + now.getMinutes()).slice(-2);
      const seconds = ("0" + now.getSeconds()).slice(-2);

      const timeString = hours + ":" + minutes + ":" + seconds;

      setTime(timeString);
    }, 1000);
  }, [time]);

  return <label className="lbl_clock">{time}</label>;
};

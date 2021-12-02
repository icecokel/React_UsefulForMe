import PageInfo from "../common/PageInfoUtil";

/**
 * 메인 컴포넌트
 *
 * @author LeeSangMin
 * @since 2021/11/24
 */
const Main = (props: any) => {
  return (
    <div>
      <h2>메인</h2>
      <div className="box_main">
        <div className="box_dashboard">
          <h4>대시보드</h4>
          <div>
            <h1>구상중</h1>
          </div>
        </div>
        <div className="box_menu">
          <ul>
            {PageInfo.getPageInfo().map((item) => {
              return (
                <li>
                  <button
                    onClick={() => {
                      props.history.push(item.path);
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Main;

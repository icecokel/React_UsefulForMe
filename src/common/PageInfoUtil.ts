import { PagePath } from "./enum";
const PAGE_INFO_LIST = [
  { title: "Main", path: PagePath.Main },
  { title: "Timer", path: PagePath.Timer },
  { title: "wordQuiz", path: PagePath.WordQuiz },
  { title: "memo", path: PagePath.Memo },
  { title: "TodoList", path: PagePath.TodoList },
  { title: "BoardGame", path: PagePath.BoardGame },
];

/**
 * 페이지 정보 유틸
 */
const PageInfoUtil = {
  /**
   * 페이지 전체 정보를 반환합니다
   * @returns 페이지 리스트
   */
  getRawData: () => {
    return PAGE_INFO_LIST;
  },
  /**
   * 현재 페이지를 제외한 페이지를 반환합니다.
   * @returns 현재 페이지를 제외한 페이지 리스트
   */
  getPageInfo: () => {
    const currentPagePath = window.location.pathname;
    return PAGE_INFO_LIST.filter((item) => item.path !== currentPagePath);
  },
};

export default PageInfoUtil;

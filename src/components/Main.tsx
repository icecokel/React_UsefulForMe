import { useState } from "react";
import { PagePath } from "../common/enum";

const Main = (props: any) => {
  const bubbleList = [
    { title: "Timer", path: PagePath.Timer },
    { title: "wordQuiz", path: PagePath.WordQuiz },
    { title: "memo", path: PagePath.Memo },
  ];

  const displayBubble = () => {
    console.log("2323");

    const bubbles = [] as any;

    if (!bubbleList) {
      return;
    }

    bubbleList.forEach((item) => {
      bubbles.push(<Bubble title={item.title} path={item.path} />);
    });

    return bubbles;
  };

  return (
    <div>
      <div>{displayBubble()}</div>
    </div>
  );
};
const Bubble = (props: any) => {
  return (
    <div>
      <div>
        <label htmlFor={props.title + "_link"}>
          <a id={props.title + "_link"} href={props.path}>
            {props.title}
          </a>
        </label>
      </div>
    </div>
  );
};

export default Main;

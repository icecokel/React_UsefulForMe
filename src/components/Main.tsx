import { useState } from "react";

const Main = (props: any) => {
  const bubbleList = [{ content: "" }];

  const displayBubble = () => {
    const bubbles = [] as any;

    if (!bubbleList) {
      return;
    }

    Object.entries(bubbleList).forEach(() => {});

    return bubbles;
  };

  return <div></div>;
};

Main.propTypes = {};

const Bubble = (props: any) => {
  return (
    <div>
      <div>
        <label>{props.content}</label>
      </div>
    </div>
  );
};

export default Main;

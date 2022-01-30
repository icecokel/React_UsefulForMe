const GemeHelper = {
  moveBlock: (start: boolean) => {
    window.onkeydown = ({ key }) => {
      if (!start) {
        return;
      }
      switch (key) {
        case "ArrowUp":
          console.log(key);
          break;
        case "ArrowRight":
          console.log(key);
          break;
        case "ArrowDown":
          console.log(key);
          break;
        case "ArrowLeft":
          console.log(key);
          break;
        default:
          break;
      }
    };
  },
};

export default GemeHelper;

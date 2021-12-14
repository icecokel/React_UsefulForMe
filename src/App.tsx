import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PagePath } from "./common/enum";
import "./common/style.scss";
import Main from "./components/Main";
import Timer from "./components/Timer/Timer";
import NotFonud from "./components/NotFound";
import WordQuiz from "./components/wordQuiz/WordQuiz";
import Memo from "./components/Memo/Memo";
import BoardGame from "./components/BoardGame/BoardGame";
const App = () => {
  return (
    <div className="main">
      <Router>
        <Switch>
          <Route
            exact
            path={PagePath.Main}
            render={(props) => <Main {...props} />}
          />
          <Route
            path={PagePath.Timer}
            render={(props) => <Timer {...props} />}
          />
          <Route
            path={PagePath.WordQuiz}
            render={(props) => <WordQuiz {...props} />}
          />
          <Route path={PagePath.Memo} render={(props) => <Memo {...props} />} />
          <Route
            path={PagePath.BoardGame}
            render={(props) => <BoardGame {...props} />}
          />
          <Route component={NotFonud}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

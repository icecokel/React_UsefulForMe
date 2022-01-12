import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PagePath } from "./common/enum";
import "./common/style.scss";
import { Provider } from "./Context";
import Main from "./components/Main";
import Timer from "./components/Timer/Timer";
import NotFonud from "./components/NotFound";
import WordQuiz from "./components/wordQuiz/WordQuiz";
import Memo from "./components/Memo/Memo";
import BoardGame from "./components/BoardGame/BoardGame";
import TodoList from "./components/TodoList/TodoList";
import Tetris from "./components/Tetris/Tetris";
const App = () => {
  return (
    <div className="main">
      <Router>
        <Provider>
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
            <Route
              path={PagePath.Memo}
              render={(props) => <Memo {...props} />}
            />
            <Route
              path={PagePath.BoardGame}
              render={(props) => <BoardGame {...props} />}
            />
            <Route
              path={PagePath.TodoList}
              render={(props) => <TodoList {...props} />}
            />
            <Route
              path={PagePath.Tetris}
              render={(props) => <Tetris {...props} />}
            />
            <Route component={NotFonud}></Route>
          </Switch>
        </Provider>
      </Router>
    </div>
  );
};

export default App;

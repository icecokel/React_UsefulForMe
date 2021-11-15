import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PagePath } from "./common/enum";
import "./common/style.scss";
import Main from "./components/Main";
import Timer from "./components/Timer/Timer";

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
          <Route></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

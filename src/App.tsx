import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PagePath } from "./common/enum";
import "./common/style.scss";
import Main from "./components/Main";
import Timer from "./components/Timer/Timer";
import NotFonud from "./components/NotFound";

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
          <Route component={NotFonud}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

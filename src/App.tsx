import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PagePath } from "./common/enum";

import Main from "./components/Main";

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
          <Route></Route>
          <Route></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

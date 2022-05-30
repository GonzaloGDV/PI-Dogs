import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home.jsx";
import Landing from "./components/Landing.jsx";
import Create from "./components/Create.jsx";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/home" component={Home} />

        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;

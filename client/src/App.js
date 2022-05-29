import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Landing from "./components/Landing.jsx";
import Create from "./components/Create.jsx";

const App = () => {
  return (
    <div className="App">
      <Route path="/home" component={Home} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/create" component={Create} />
    </div>
  );
};

export default App;

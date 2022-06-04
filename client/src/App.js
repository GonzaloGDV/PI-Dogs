import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Landing from "./components/Landing.jsx";
import Create from "./components/Create.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import NoResults from "./components/NoResults.jsx";
import Details from "./components/Details.jsx";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/create" element={<Create />} />
      <Route path="/home" element={<Home />} />
      <Route path="/noresults" element={<NoResults />} />
      <Route path="/details/:id" element={<Details />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;

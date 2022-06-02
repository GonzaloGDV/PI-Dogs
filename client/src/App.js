import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Landing from "./components/Landing.jsx";
import Create from "./components/Create.jsx";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/create" element={<Create />} />
      <Route path="/home" element={<Home />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;

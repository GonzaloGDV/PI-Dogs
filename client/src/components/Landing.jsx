import React from "react";
import Budhi from "../images/budhi.jpg";
import { Link } from "react-router-dom";
import style from "./styles/Landing.module.css";

const Landing = () => {
  return (
    <div>
      <h1>Welcome to Dogs PI</h1>
      <img className={style.Container} src={Budhi} alt="Welcome Budhi" />
      <Link to="/home">
        <button>Start</button>
      </Link>
    </div>
  );
};

export default Landing;

import React from "react";
import Budhi from "../images/budhi.jpeg";
import Welcome from "../images/dog-paw-welcome.png";
import { Link } from "react-router-dom";
import style from "./styles/Landing.module.css";

const Landing = () => {
  return (
    <div className={style.Container}>
      <h1 className={style.welcome}>Welcome to Dogs PI</h1>
      <img className={style.photo} src={Budhi} alt="Welcome Budhi" />
      <Link to="/home">
        <button>
          <img className={style.button} src={Welcome} alt="welcome paw" />
        </button>
      </Link>
    </div>
  );
};

export default Landing;

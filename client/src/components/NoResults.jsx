import React from "react";
import style from "./styles/NoResults.module.css";
import { Link } from "react-router-dom";
import dogePageNotFound from "../images/Crying-Doge.jpeg";

const NoResults = () => {
  return (
    <div className={style.Container}>
      <Link to="/home" className={style.linkHome}>
        Home
      </Link>
      <h1 className={style.title}>No Results</h1>
      <img className={style.photo} src={dogePageNotFound} alt="No Results" />
    </div>
  );
};

export default NoResults;

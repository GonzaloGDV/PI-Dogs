import React from "react";
import { Link } from "react-router-dom";
import dogePageNotFound from "../images/page-not-found.jpeg";
import style from "./styles/PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={style.Container}>
      <Link to="/home" className={style.linkHome}>
        Home
      </Link>
      <h1 className={style.title}>Error 404</h1>
      <img className={style.photo} src={dogePageNotFound} alt="Error 404" />
    </div>
  );
};

export default PageNotFound;

import React from "react";
import dogePageNotFound from "../images/page-not-found.jpeg";
import style from "./styles/PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div>
      <h1>Error 404</h1>
      <img className={style.Container} src={dogePageNotFound} alt="Error 404" />
    </div>
  );
};

export default PageNotFound;

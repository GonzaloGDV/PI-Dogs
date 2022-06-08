import React from "react";
import style from "./styles/NoResultsId.module.css";
import dogePageNotFound from "../../images/Crying-Doge.jpeg";

const NoResults = () => {
  function refreshPage() {
    window.history.back();
  }

  return (
    <div className={style.Container}>
      <h1 className={style.title}>
        We are sorry, your search was unsuccessful
      </h1>
      <img className={style.photo} src={dogePageNotFound} alt="No Results" />
      <button className={style.button} onClick={refreshPage}>
        Return to previous page
      </button>
    </div>
  );
};

export default NoResults;

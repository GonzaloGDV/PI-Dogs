import React from "react";
import style from "./styles/NoResults.module.css";
import dogePageNotFound from "../../images/Crying-Doge.jpeg";

const NoResults = () => {
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className={style.Container}>
      <h1 className={style.title}>
        We are sorry, your search was unsuccessful
      </h1>
      <img className={style.photo} src={dogePageNotFound} alt="No Results" />
      <button className={style.button} onClick={refreshPage}>
        Return to home page
      </button>
    </div>
  );
};

export default NoResults;

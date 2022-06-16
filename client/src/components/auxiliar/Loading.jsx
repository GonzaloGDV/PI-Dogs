import React from "react";
import style from "./styles/Loading.module.css";
import LoadingGif from "../../images/loading-dog.gif";

const Loading = () => {
  return (
    <div className={style.Container}>
      <img className={style.gif} src={LoadingGif} alt="Loading" />
    </div>
  );
};

export default Loading;

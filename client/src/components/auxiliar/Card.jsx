import React from "react";
import style from "./styles/Card.module.css";

export default function Card({ image, name, temperaments, weight }) {
  return (
    <div className={style.card}>
      <h3 className={style.name}>{name}</h3>
      <img src={image} alt={name} className={style.photo} />
      {/* <img src={image} alt={name} width="100%" height="auto" /> */}

      <h5 className={style.temperaments}>{temperaments}</h5>
      <h5 className={style.weight}>{weight}</h5>
    </div>
  );
}

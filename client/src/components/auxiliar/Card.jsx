import React from "react";

export default function Card({ image, name, temperaments, weight }) {
  return (
    <div>
      <img src={image} alt={name} width="250px" height="200px" />
      {/* <img src={image} alt={name} width="100%" height="auto" /> */}
      <h3>{name}</h3>
      <h5>{temperaments}</h5>
      <h5>{weight}</h5>
    </div>
  );
}

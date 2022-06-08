import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dogDetail, clearDetails } from "../redux/actions.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./styles/Details.module.css";

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearDetails());
    dispatch(dogDetail(id));
  }, [dispatch, id]);

  const dogSelected = useSelector((state) => state.dogDetail);

  return (
    <div className={style.Container}>
      <Link to="/home" className={style.linkHome}>
        Home
      </Link>
      <div className={style.render}>
        <img
          src={dogSelected.image}
          alt={dogSelected.name}
          width="500px"
          height="400px"
          className={style.photo}
        />
        <h1>{dogSelected.name}</h1>
        <h3>
          {!dogSelected.created
            ? dogSelected.temperament
            : dogSelected.temperaments.map((temp) => temp.name + " ")}
        </h3>
        <h3>{`${dogSelected.weight} kg`}</h3>
        <h3>{`${dogSelected.height} cm`}</h3>
        <h3>{dogSelected.life_span}</h3>
      </div>
    </div>
  );
}

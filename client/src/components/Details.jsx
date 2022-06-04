import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dogDetail } from "../redux/actions.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dogDetail(id));
  }, [dispatch, id]);

  const dogSelected = useSelector((state) => state.dogDetail);

  return (
    <div>
      <Link to="/home">Home</Link>
      <div>
        <img src={dogSelected.image} alt="" />
        <h1>{dogSelected.name}</h1>
        <h3>{dogSelected.temperament}</h3>
        <h3>{dogSelected.weight}</h3>
        <h3>{dogSelected.height}</h3>
        <h3>{dogSelected.life_span}</h3>
      </div>
    </div>
  );
}

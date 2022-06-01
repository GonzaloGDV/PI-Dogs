import React, { useState } from "react";
import style from "./styles/Create.module.css";

export function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(input.name)) {
    errors.name = "Name is invalid. Only letters";
  }
  if (!input.height) {
    errors.height = "Height is required";
  } else if (!/^[0-9]*$/.test(input.height)) {
    errors.height = "Height is invalid. Only integers";
  }
  if (!input.weight) {
    errors.weight = "Weight is required";
  } else if (!/^[0-9]*$/.test(input.weight)) {
    errors.weight = "Weight is invalid. Only Integers";
  }
  if (!input.lifeSpan) {
    errors.lifeSpan = "Life Span is required";
  } else if (!/^[0-9]*$/.test(input.lifeSpan)) {
    errors.lifeSpan = "Life Span is invalid. Only Integers";
  }
  if (!input.temperament) {
    errors.temperament = "Temperament is required";
  } else if (!/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(input.temperament)) {
    errors.temperament = "temperament is invalid";
  }
  return errors;
}

const Create = () => {
  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    lifeSpan: "",
    temperament: [],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          className={errors.name && style.danger}
          type="text"
          name="name"
          onChange={handleInputChange}
          value={input.name}
          placeholder={"Type dog breed"}
        />
        {errors.name && <p className={style.danger}>{errors.name}</p>}
      </div>
      <div>
        <label>Height:</label>
        <input
          className={errors.height && style.danger}
          type="text"
          name="height"
          onChange={handleInputChange}
          value={input.height}
          placeholder={"Type height (cm)"}
        />
        {errors.height && <p className={style.danger}>{errors.height}</p>}
      </div>
      <div>
        <label>Weight:</label>
        <input
          className={errors.weight && style.danger}
          type="text"
          name="weight"
          onChange={handleInputChange}
          value={input.weight}
          placeholder={"Type weight (kg)"}
        />
        {errors.weight && <p className={style.danger}>{errors.weight}</p>}
      </div>
      <div>
        <label>Life Span:</label>
        <input
          className={errors.lifeSpan && style.danger}
          type="text"
          name="lifeSpan"
          onChange={handleInputChange}
          value={input.lifeSpan}
          placeholder={"Type life span (years)"}
        />
        {errors.lifeSpan && <p className={style.danger}>{errors.lifeSpan}</p>}
      </div>
      <div>
        <label>Temperament:</label>
        <input
          className={errors.temperament && style.danger}
          type="text"
          name="temperament"
          onChange={handleInputChange}
          value={input.temperament}
          placeholder={"Type temperaments"}
        />
        {errors.temperament && (
          <p className={style.danger}>{errors.temperament}</p>
        )}
      </div>
      {!errors && <button type="submit">Submit</button>}
    </form>
  );
};

export default Create;

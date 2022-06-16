import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/Create.module.css";
import { Link } from "react-router-dom";
import { getAllDogs, getAllTemperaments, createDog } from "../redux/actions";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allTemperaments = useSelector((state) => state.temperaments);
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getAllTemperaments());
    dispatch(getAllDogs()); //?
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  //********Error management********
  const [errors, setErrors] = useState({});

  function validate(input) {
    let errors = {};
    if (
      allDogs.find((dog) => dog.name.toUpperCase() === input.name.toUpperCase())
    )
      errors.name =
        "There is already a dog with that name, choose another name please";

    if (!input.name) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(input.name)) {
      errors.name = "Name is invalid. Only letters";
    }
    if (!input.height_min) {
      errors.height_min = "Minimum height is required";
    } else if (!/^[0-9]*$/.test(input.height_min)) {
      errors.height_min = "Minimum height is invalid. Only integers";
    } else if (parseInt(input.height_min) > parseInt(input.height_max)) {
      errors.height_min =
        "Minimum height is invalid. It can not be higher than maximum height";
    } else if (parseInt(input.height_min) === 0) {
      errors.height_min =
        "Minimum height is invalid. It can not be equal to 0 cm";
    }
    if (!input.height_max) {
      errors.height_max = "Maximum height is required";
    } else if (!/^[0-9]*$/.test(input.height_max)) {
      errors.height_max = "Maximum height is invalid. Only integers";
    } else if (parseInt(input.height_max) > 200) {
      errors.height_max =
        "Maximum height is invalid. It can not be higher than 200 cm";
    }
    if (!input.weight_min) {
      errors.weight_min = "Minimum weight is required";
    } else if (!/^[0-9]*$/.test(input.weight_min)) {
      errors.weight_min = "Minimum weight is invalid. Only integers";
    } else if (parseInt(input.weight_min) === 0) {
      errors.weight_min =
        "Minimum weight is invalid. It can not be equal to 0 kg";
    }
    if (!input.weight_max) {
      errors.weight_max = "Maximum weight is required";
    } else if (!/^[0-9]*$/.test(input.weight_max)) {
      errors.weight_max = "Maximum weight is invalid. Only integers";
    } else if (parseInt(input.weight_max) < parseInt(input.weight_min)) {
      errors.weight_max =
        "Maximum weight is invalid. It can not be lower than minimum weight";
    } else if (parseInt(input.weight_max) > 200) {
      errors.weight_max =
        "Maximum weight is invalid. It can not be higher than 200 kg";
    }
    if (!input.life_span) {
      errors.life_span = "Life Span is required";
    } else if (!/^[0-9]*$/.test(input.life_span)) {
      errors.life_span = "Life Span is invalid. Only Integers";
    } else if (parseInt(input.life_span) > 50) {
      errors.life_span =
        "Life Span is invalid. It can not be higher than 50 years";
    }
    if (!input.image) {
      errors.image = "Url of image is required";
    } else if (!/\.(jpg|png|gif)$/i.test(input.image)) {
      errors.image = "Image format is invalid";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
      errors.image = "Url format is invalid";
    }
    return errors;
  }

  //**********Handlers**********

  function handlerInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handlerSelect(e) {
    if (!input.temperaments.includes(e.target.value)) {
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
    }
  }

  function handlerDelete(temp) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((selected) => selected !== temp),
    });
  }

  //********Create Button********
  const handlerCreateDog = (e) => {
    e.preventDefault();
    dispatch(
      createDog({
        ...input,
        height: input.height_min.concat(" - ", input.height_max),
        weight: input.weight_min.concat(" - ", input.weight_max),
      })
    );
    alert("Your dog has been created");
    setInput({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      image: "",
      temperaments: [],
    });
    setTimeout(() => {
      navigate("/home");
    }, 100);
  };

  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (
      input.name === "" ||
      input.temperaments.length < 1 ||
      errors.hasOwnProperty("name") ||
      errors.hasOwnProperty("height_min") ||
      errors.hasOwnProperty("height_max") ||
      errors.hasOwnProperty("weight_min") ||
      errors.hasOwnProperty("weight-max") ||
      errors.hasOwnProperty("life_span") ||
      errors.hasOwnProperty("image") ||
      errors.hasOwnProperty("temperaments")
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [errors, input, setDisabledButton]);

  return (
    <div className={style.Container}>
      <h1 className={style.title}>Create your dog</h1>
      <Link to="/home" className={style.linkHome}>
        Home
      </Link>
      <form className={style.formContainer}>
        <div className={style.name}>
          <label>Name:</label>
          <input
            className={errors.name && style.danger}
            type="text"
            name="name"
            onChange={handlerInputChange}
            value={input.name}
            placeholder={"Type dog breed"}
            autoComplete="off"
          />
          {errors.name && <p className={style.danger}>{errors.name}</p>}
        </div>

        <div className={style.height_min}>
          <label>Height minimum:</label>
          <input
            className={errors.height_min && style.danger}
            type="text"
            name="height_min"
            onChange={handlerInputChange}
            value={input.height_min}
            placeholder={"Type height min (cm)"}
            autoComplete="off"
          />
          {errors.height_min && (
            <p className={style.danger}>{errors.height_min}</p>
          )}
        </div>

        <div className={style.height_max}>
          <label>Height maximum:</label>
          <input
            className={errors.height_max && style.danger}
            type="text"
            name="height_max"
            onChange={handlerInputChange}
            value={input.height_max}
            placeholder={"Type height max (cm)"}
            autoComplete="off"
          />
          {errors.height_max && (
            <p className={style.danger}>{errors.height_max}</p>
          )}
        </div>

        <div className={style.weight_min}>
          <label>Weight minimum:</label>
          <input
            className={errors.weight_min && style.danger}
            type="text"
            name="weight_min"
            onChange={handlerInputChange}
            value={input.weight_min}
            placeholder={"Type weight min (kg)"}
            autoComplete="off"
          />
          {errors.weight_min && (
            <p className={style.danger}>{errors.weight_min}</p>
          )}
        </div>

        <div className={style.weight_max}>
          <label>Weight maximum:</label>
          <input
            className={errors.weight_max && style.danger}
            type="text"
            name="weight_max"
            onChange={handlerInputChange}
            value={input.weight_max}
            placeholder={"Type weight max (kg)"}
            autoComplete="off"
          />
          {errors.weight_max && (
            <p className={style.danger}>{errors.weight_max}</p>
          )}
        </div>

        <div className={style.life_span}>
          <label>Life Span:</label>
          <input
            className={errors.life_span && style.danger}
            type="text"
            name="life_span"
            onChange={handlerInputChange}
            value={input.life_span}
            placeholder={"Type life span (years)"}
            autoComplete="off"
          />
          {errors.life_span && (
            <p className={style.danger}>{errors.life_span}</p>
          )}
        </div>

        <div className={style.url}>
          <label>Image URL:</label>
          <input
            className={errors.image && style.danger}
            type="text"
            name="image"
            onChange={handlerInputChange}
            value={input.image}
            placeholder={"Type image URL"}
            autoComplete="off"
          />
          {errors.image && <p className={style.danger}>{errors.image}</p>}
        </div>

        <div className={style.selectTemperament}>
          <label>Choose temperament:</label>
          <select defaultValue={"DEFAULT"} onChange={handlerSelect}>
            <option value="DEFAULT" disabled>
              Choose temperament
            </option>
            {allTemperaments &&
              allTemperaments.map((temperament) => {
                return (
                  <option key={temperament.id} value={temperament.name}>
                    {temperament.name}
                  </option>
                );
              })}
          </select>
        </div>

        <ul>
          {input.temperaments.map((temp) => (
            <li key={temp.id}>
              <span>{temp}</span>

              <button
                type="button"
                className={style.submitButton}
                onClick={() => handlerDelete(temp)}
              >
                X
              </button>
            </li>
          ))}
        </ul>

        <button
          disabled={disabledButton}
          className={style.buttonCreateDog}
          onClick={handlerCreateDog}
        >
          Create dog
        </button>
      </form>
    </div>
  );
};

export default Create;

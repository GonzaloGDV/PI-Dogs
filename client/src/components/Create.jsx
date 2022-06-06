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
    weight: "",
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
    // if (!input.height_min) {
    //   errors.height_min = "Minimum height is required";
    // } else if (!/^[0-9]*$/.test(input.height_min)) {
    //   errors.height_min = "Minimum height is invalid. Only integers";
    // } else if (input.height_min > input.height_max) {
    //   errors.height_min =
    //     "Minimum height is invalid. It can not be lower than maximum height";
    // }
    if (!input.height) {
      errors.height = "Maximum height is required";
    } else if (!/^[0-9]*$/.test(input.height)) {
      errors.height = "Maximum eight is invalid. Only integers";
    }
    if (!input.weight) {
      errors.weight = "Weight is required";
    } else if (!/^[0-9]*$/.test(input.weight)) {
      errors.weight = "Weight is invalid. Only Integers";
    }
    if (!input.life_span) {
      errors.life_span = "Life Span is required";
    } else if (!/^[0-9]*$/.test(input.life_span)) {
      errors.life_span = "Life Span is invalid. Only Integers";
    }
    if (!input.image) {
      errors.image = "Image url is required";
    } else if (!/\.(jpg|png|gif)$/i.test(input.image)) {
      errors.image = "Image url is invalid";
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
    dispatch(createDog({ ...input, name: input.name.toLowerCase() }));
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
      errors.hasOwnProperty("height") ||
      // errors.hasOwnProperty("height_max") ||
      errors.hasOwnProperty("weight") ||
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
        <div>
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

        {/* <div>
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
        </div> */}

        <div>
          <label>Height maximum:</label>
          <input
            className={errors.height && style.danger}
            type="text"
            name="height"
            onChange={handlerInputChange}
            value={input.height}
            placeholder={"Type height max(cm)"}
            autoComplete="off"
          />
          {errors.height && <p className={style.danger}>{errors.height}</p>}
        </div>

        <div>
          <label>Weight:</label>
          <input
            className={errors.weight && style.danger}
            type="text"
            name="weight"
            onChange={handlerInputChange}
            value={input.weight}
            placeholder={"Type weight (kg)"}
            autoComplete="off"
          />
          {errors.weight && <p className={style.danger}>{errors.weight}</p>}
        </div>

        <div>
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

        <div>
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

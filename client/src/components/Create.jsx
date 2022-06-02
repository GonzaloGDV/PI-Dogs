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
    height: "",
    weight: "",
    lifeSpan: "",
    img: "",
    temperament: [],
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
    if (!input.img) {
      errors.img = "Image url is required";
    } else if (!/\.(jpg|png|gif)$/i.test(input.img)) {
      errors.img = "Image url is invalid";
    }
    return errors;
  }

  //**********Handlers**********

  // const handleInputChange = (e) => {
  //   setInput((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  function handleInputChange(e) {
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

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(input);
  // }

  const handlerFirstSelect = (e) => {
    if (input.temperament.length <= 1) {
      setInput({
        ...input,
        temperament: [e.target.value],
      });
    } else if (e.target.value === input.temperament[1]) {
      setInput({
        ...input,
        temperament: [e.target.value],
      });
    } else {
      setInput({
        ...input,
        temperament: [e.target.value, input.temperament[1]],
      });
    }
  };

  //********Create Button********
  const handlerCreateDog = (e) => {
    e.preventDefault();
    dispatch(createDog({ ...input, name: input.name.toLowerCase() }));
    alert("Your dog has been created");
    setInput({
      name: "",
      height: "",
      weight: "",
      lifeSpan: "",
      img: "",
      temperament: [],
    });
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (
      input.name === "" ||
      input.temperament.length < 1 ||
      errors.hasOwnProperty("name") ||
      errors.hasOwnProperty("height") ||
      errors.hasOwnProperty("weight") ||
      errors.hasOwnProperty("lifeSpan") ||
      errors.hasOwnProperty("img") ||
      errors.hasOwnProperty("temperament")
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [errors, input, setDisabledButton]);

  return (
    <div>
      <h1>Create your dog</h1>
      <Link to="/home">Home</Link>
      <form>
        {/* <form onSubmit={handleSubmit}> */}
        <div>
          <label>Name:</label>
          <input
            className={errors.name && style.danger}
            type="text"
            name="name"
            onChange={handleInputChange}
            value={input.name}
            placeholder={"Type dog breed"}
            autoComplete="off"
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
            onChange={handleInputChange}
            value={input.weight}
            placeholder={"Type weight (kg)"}
            autoComplete="off"
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
            autoComplete="off"
          />
          {errors.lifeSpan && <p className={style.danger}>{errors.lifeSpan}</p>}
        </div>

        <div>
          <label>Image URL:</label>
          <input
            className={errors.img && style.danger}
            type="text"
            name="img"
            onChange={handleInputChange}
            value={input.img}
            placeholder={"Type image URL"}
            autoComplete="off"
          />
          {errors.img && <p className={style.danger}>{errors.img}</p>}
        </div>

        <div className={style.selectTemperament}>
          <label>Choose first temperament:</label>
          <select
            defaultValue={"DEFAULT"}
            onChange={(e) => handlerFirstSelect(e)}
          >
            <option value="DEFAULT" disabled>
              Choose first temperament
            </option>
            {allTemperaments &&
              allTemperaments.map((temperament) => {
                return (
                  <option key={temperament.id} value={temperament.name}>
                    {temperament.name}
                  </option>
                  //    <option key={temperament.name} value={temperament.name}>
                  //    {temperament.name}
                  //  </option>
                );
              })}
          </select>
        </div>

        <button
          disabled={disabledButton}
          className={style.buttonCreateDog}
          onClick={(e) => handlerCreateDog(e)}
        >
          Create dog
        </button>
      </form>
    </div>
  );
};

export default Create;

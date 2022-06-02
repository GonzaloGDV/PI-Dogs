import React from "react";
import { getDogByName } from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogByName(name));
    //setName({ name: " " });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a breed"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit search
      </button>
    </div>
  );
};

export default SearchBar;

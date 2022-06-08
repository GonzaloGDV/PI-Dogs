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
    if (!name) {
      alert("You should type a breed to start your search");
    } else {
      dispatch(getDogByName(name));
      // setName("");
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Type a breed"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit a search
      </button>
    </div>
  );
};

export default SearchBar;

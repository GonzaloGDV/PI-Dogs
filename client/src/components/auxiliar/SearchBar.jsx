import React from "react";
import { getDogByName } from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      alert("You should type a breed to start your search");
      // if (!name) {
      //   setTimeout(() => {
      //     navigate("/noresults");
      //   }, 100);
    } else {
      dispatch(getDogByName(name));
    }
    // setName({ name: " " });
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

// export function formatError(errorResponse) {
//   switch (errorResponse.error.message) {
//     case "DOG_BREED_NOT_FOUND":
//       return "Dog breed not found";
//     default:
//       return "";
//   }
// }

import axios from "axios";
export const GET_DOGS = "GET_DOGS";

export function getAllDogs() {
  return (dispatch) => {
    return axios("http://localhost:3001/dogs/").then((res) =>
      dispatch({ type: GET_DOGS, payload: res.data })
    );
  };
}

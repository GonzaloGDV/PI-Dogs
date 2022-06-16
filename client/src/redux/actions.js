import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const DOG_DETAIL = "DOG_DETAIL";
export const CREATE_DOG = "CREATE_DOG";
export const DELETE_DOG = " DELETE_DOG";
export const FILTER_API_VS_CREATED = "FILTER_API_VS_CREATED";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const FAILED_GET_DOG = "FAILED_GET_DOG";
export const CLEAR_DETAILS = "CLEAR_DETAILS";

export function getAllDogs() {
  return (dispatch) => {
    return axios("http://localhost:3001/dogs/").then((res) =>
      dispatch({ type: GET_DOGS, payload: res.data })
    );
  };
}

export function getDogByName(breed) {
  return (dispatch) => {
    return axios(`http://localhost:3001/dogs?name=${breed}`)
      .then((res) => dispatch({ type: GET_DOG_BY_NAME, payload: res.data }))
      .catch((error) => {
        dispatch({
          type: FAILED_GET_DOG,
          message: error.message || "Something went wrong.",
        });
      });
  };
}

export function getAllTemperaments() {
  return (dispatch) => {
    return axios("http://localhost:3001/temperament/").then((res) =>
      dispatch({ type: GET_TEMPERAMENTS, payload: res.data })
    );
  };
}

export function dogDetail(id) {
  return (dispatch) => {
    return axios(`http://localhost:3001/dogs/${id}`)
      .then((res) => dispatch({ type: DOG_DETAIL, payload: res.data }))
      .catch((error) => {
        dispatch({
          type: FAILED_GET_DOG,
          message: error.message || "Something went wrong.",
        });
      });
  };
}

export function clearDetails() {
  return {
    type: CLEAR_DETAILS,
    payload: {},
  };
}

export function createDog(payload) {
  return (dispatch) => {
    return axios.post("http://localhost:3001/dog/", payload);
  };
}

export function deleteDog(payload) {
  return {
    type: DELETE_DOG,
    payload,
  };
}

export function filterDogsApiVsCreated(payload) {
  return {
    type: FILTER_API_VS_CREATED,
    payload,
  };
}

export function filterByTemperament(payload) {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}

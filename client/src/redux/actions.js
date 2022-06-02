import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const FILTER_API_VS_CREATED = "FILTER_API_VS_CREATED";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const CREATE_DOG = "CREATE_DOG";

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
      .catch((error) => console.log(error));
  };
}

export function getAllTemperaments() {
  return (dispatch) => {
    return axios("http://localhost:3001/temperament/").then((res) =>
      dispatch({ type: GET_TEMPERAMENTS, payload: res.data })
    );
  };
}

export function createDog(payload) {
  return (dispatch) => {
    return axios.post("http://localhost:3001/dog/", payload);
    // .then((res) => dispatch({ type: CREATE_DOG, payload }));
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

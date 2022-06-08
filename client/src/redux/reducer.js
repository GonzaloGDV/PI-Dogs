import {
  GET_DOGS,
  GET_DOG_BY_NAME,
  FAILED_GET_DOG,
  GET_TEMPERAMENTS,
  DOG_DETAIL,
  CLEAR_DETAILS,
  CREATE_DOG,
  FILTER_API_VS_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENT,
} from "./actions";

const initialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  dogDetail: [],
  noResults: "",
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: payload,
        allDogs: payload,
      };

    case GET_DOG_BY_NAME:
      return {
        ...state,
        dogs: payload,
      };

    case FAILED_GET_DOG:
      return {
        ...state,
        noResults: false,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload,
      };

    case DOG_DETAIL:
      return {
        ...state,
        dogDetail: payload,
      };

    case CLEAR_DETAILS:
      return {
        ...state,
        dogDetail: payload,
      };

    case CREATE_DOG:
      return {
        ...state,
      };

    case FILTER_API_VS_CREATED:
      const allDogs = state.allDogs;
      const filtered =
        payload === "api"
          ? allDogs.filter((dog) => dog.id < 300)
          : allDogs.filter((dog) => dog.id.length > 3);
      return {
        ...state,
        dogs: payload === "All" ? state.allDogs : filtered,
      };

    case FILTER_BY_TEMPERAMENT:
      const allDogs2 = state.allDogs;
      const filterTemperament = allDogs2.filter((dog) =>
        !dog.created
          ? dog.temperament.includes(payload)
          : dog.temperaments.map((temp) => temp.name).includes(payload)
      );
      return {
        ...state,
        dogs: payload === "All" ? state.allDogs : filterTemperament,
      };

    case ORDER_BY_NAME:
      const orderedArray =
        payload === "ascend"
          ? state.dogs.sort((a, b) => a.name.localeCompare(b.name))
          : state.dogs.sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        dogs: orderedArray,
      };

    case ORDER_BY_WEIGHT:
      const weightArray =
        payload === "lighter"
          ? state.dogs.sort(function (a, b) {
              return (
                parseInt(a.weight.split("-")[0]) -
                parseInt(b.weight.split("-")[0])
              );
            })
          : state.dogs.sort(function (a, b) {
              return (
                parseInt(b.weight.split("-")[1]) -
                parseInt(a.weight.split("-")[1])
              );
            });
      return {
        ...state,
        dogs: weightArray,
      };

    default:
      return state;
  }
}

export default reducer;

import {
  GET_DOGS,
  GET_TEMPERAMENTS,
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
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: payload,
        allDogs: payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload,
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
      const filterTemperament = allDogs2.filter((dog) => dog.includes(payload));
      return {
        ...state,
        dogs: filterTemperament,
      };

    case ORDER_BY_NAME:
      const orderedArray =
        payload === "ascend"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: orderedArray,
      };

    case ORDER_BY_WEIGHT:
      const weightArray =
        payload === "ascend"
          ? state.dogs.sort(function (a, b) {
              // if (
              //   parseInt(a.weight.split("-")[0]) >
              //   parseInt(b.weight.split("-")[0])
              // )
              //   return 1;
              // if (
              //   parseInt(b.weight.split("-")[0]) >
              //   parseInt(a.weight.split("-")[0])
              // )
              //   return -1;
              // return 0;
              return (
                parseInt(a.weight.split("-")[0]) -
                parseInt(b.weight.split("-")[0])
              );
            })
          : state.dogs.sort(function (a, b) {
              // if (
              //   parseInt(a.weight.split("-")[1]) >
              //   parseInt(b.weight.split("-")[1])
              // )
              //   return -1;
              // if (
              //   parseInt(b.weight.split("-")[1]) >
              //   parseInt(a.weight.split("-")[1])
              // )
              //   return 1;
              // return 0;
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

import { GET_DOGS } from "./actions";

const initialState = {
  dogs: [],
  temperaments: [],
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: payload,
      };
    default:
      return state;
  }
}

export default reducer;

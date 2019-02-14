import { FETCH_APPS, SUBMIT_FORM, UPDATE_FORM } from "../actions";

const initialState = {
  applications: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_APPS:
      return [...action.payload.data];
    case SUBMIT_FORM:
      return state;
    case UPDATE_FORM:
      return state;
    default:
      return state;
  }
}

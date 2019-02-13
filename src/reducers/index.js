import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import applicationReducer from "./application_reducer";
const rootReducer = combineReducers({
  form: formReducer,
  applications: applicationReducer
});

export default rootReducer;

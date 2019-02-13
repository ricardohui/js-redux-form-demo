import axios from "axios";

export const SUBMIT_FORM = "submit_form";
export const submitForm = formValues => async dispatch => {
  const res = await axios.post(
    "http://localhost:3001/applications",
    formValues
  );
  dispatch({
    type: SUBMIT_FORM,
    payload: res
  });
};

export const FETCH_APPS = "fetch_apps";
export const fetchApps = () => async dispatch => {
  // FIXME: read the server url in environement variable
  const res = await axios.get("http://localhost:3001/applications");
  dispatch({
    type: FETCH_APPS,
    payload: res
  });
};

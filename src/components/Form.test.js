import { mount } from "enzyme";
import React from "react";
import Form from "./Form";
import { reducer as formReducer } from "redux-form";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
let wrapper;
beforeEach(() => {
  const store = createStore(combineReducers({ form: formReducer }));
  wrapper = mount(
    <Provider store={store}>
      <Form />
    </Provider>
  );
});
afterEach(() => {
  wrapper.unmount();
});
it("has an input element", () => {
  expect(wrapper.find("input#input-amount").length).toEqual(1);
});
it("has a value of 'text' when onChange", () => {
  wrapper
    .find("input#input-amount")
    .simulate("change", { target: { value: "text" } });
  wrapper.update();
  expect(wrapper.find("input#input-amount").prop("value")).toEqual("text");
});

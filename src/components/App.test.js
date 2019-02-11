import React from "react";
import App from "./App";
import { shallow } from "enzyme";

it("can renders without crashing using enzyme", () => {
  const wrapper = shallow(<App />);

  expect(wrapper).toBeDefined();
});

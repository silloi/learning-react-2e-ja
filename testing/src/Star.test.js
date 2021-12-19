import React from "react";
import ReactDOM from "react-dom";
import Star from "./Star";
// import { toHaveAttribute, toHaveClass } from "@testing-library/jest-dom";
// import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

// expect.extend({ toHaveAttribute, toHaveClass });

test("renders a star", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Star />, div);
  expect(div.querySelector("svg")).toHaveAttribute("id", "star");
});

// expect(you).toHaveClass("evenALittle");

test("render an h1", () => {
  const { getByText } = render(<Star />);
  const h1 = getByText(/Great Star/);
  expect(h1).toHaveTextContent("Great Star");
});

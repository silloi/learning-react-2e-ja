import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PropTypes from "prop-types";

function App({ status }) {
  return (
    <div>
      {/* <h1>{name}</h1> */}
      {/* <p>{using ? "used here" : "not used here"}</p> */}
      <h1>We're {status === "Open" ? "Open!" : "Closed!"}</h1>
    </div>
  );
}

App.PropTypes = {
  // name: PropTypes.string.isRequired,
  // using: PropTypes.bool
  status: PropTypes.string.oneOf(["Open", "Closed"])
};

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <App />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

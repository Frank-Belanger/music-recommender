import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  //<React.StrictMode>
  <Router basename={process.env.PUBLIC_URL}>
    <App />
  </Router>,
  rootElement
);
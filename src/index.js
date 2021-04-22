import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import Main from "./Main";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    <GlobalStyle />
    <Main />
  </>,
  rootElement
);

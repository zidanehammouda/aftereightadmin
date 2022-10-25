import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faAnglesLeft,
  faArrowUpWideShort,
  faSortUp,
  faSortDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
// import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";

library.add(
  faPenToSquare,
  faTrash,
  faAnglesLeft,
  faArrowUpWideShort,
  faSortUp,
  faSortDown,
  faXmark
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

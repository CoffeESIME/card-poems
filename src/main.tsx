import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { fontCSS } from "./fonts";
import "./style.css";
const fonts = document.createElement("style");
fonts.textContent = fontCSS;
document.head.appendChild(fonts);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

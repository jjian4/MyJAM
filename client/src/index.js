import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import "semantic-ui-css/semantic.min.css";

import App from "./App";

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DndProvider>,
  document.getElementById("root")
);

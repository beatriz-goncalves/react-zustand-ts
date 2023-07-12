import "./index.css";

import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { App } from "./App";
import { render } from "react-dom";

const rootElement = document.getElementById("root");
render(<App />, rootElement);

reportWebVitals();

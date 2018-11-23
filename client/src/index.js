import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { store } from "./store/store";

function Main() {
  window.removeEventListener("load", Main, false);
  //const store = createStore(reducers, applyMiddleware(logger));
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );

  serviceWorker.unregister();
}
window.addEventListener("load", Main, false);

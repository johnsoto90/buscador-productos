import reducers from "./index";
import { logger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";

const store = createStore(reducers, applyMiddleware(logger));

export { store };

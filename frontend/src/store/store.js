import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import itemReducer from "./item";
import cartReducer from "./cart";
import reviewReducer from "./review";
import orderReducer from "./order";

const rootReducer = combineReducers({
  session: sessionReducer,
  menu: itemReducer,
  cart: cartReducer,
  review: reviewReducer,
  orders: orderReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

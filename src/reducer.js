import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { drizzleReducers } from "drizzle";
import {tokenReducer} from "./state/token/tokenReducer";

const reducer = combineReducers({
  routing: routerReducer,
  token: tokenReducer,
  ...drizzleReducers
});

export default reducer;

import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import categoryReducer from "./category.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer
});

export default rootReducer;

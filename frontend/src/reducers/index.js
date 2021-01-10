import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import categoryReducer from "./category.reducers";
import productReducer from "./product.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  
});

export default rootReducer;

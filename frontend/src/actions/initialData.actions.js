import axios from "../Axios/axios";
import {
  categoryActionTypes,
  productActionTypes,
} from "./action-types";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.get("/getInitialData");
    const {categories, products} = res.data;
    if (res.status === 200) {
      dispatch({
        type: categoryActionTypes.GET_ALL_CATEGORIES_SUCCESS,
        payload: {
          categories: categories,
          message: "Categories fetched..."
        },
      });
      dispatch({
        type: productActionTypes.GET_PRODUCT_SUCCESS,
        payload: {
          products: products,
          message: "Products fetched..."
        },
      });
    } else {
      console.log(res.data.error);
    }
  };
};

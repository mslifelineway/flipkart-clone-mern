import axios from "../Axios/axios";
import { productActionTypes } from "./action-types";

//add product
export const addProduct = (form) => {
  return async (dispatch) => {
    dispatch({
      type: productActionTypes.ADD_PRODUCT_REQUEST,
      message: "Adding the product...",
    });
    const res = await axios.post(`/product/add-products`, form);
    if (res.status === 201)
      dispatch({
        type: productActionTypes.ADD_PRODUCT_SUCCESS,
        payload: {
          message: res.data.message ? res.data.message : "",
          product: res.data.result,
        },
      });
    else
      dispatch({
        type: productActionTypes.ADD_PRODUCT_FAILURE,
        payload: {
          error: res.data.error,
          message: res.data.message,
        },
      });
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: productActionTypes.GET_PRODUCT_DETAILS_REQUEST,
    });

    let res = await axios.get(`/product/${id}/details`);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: productActionTypes.GET_PRODUCT_DETAILS_SUCCESS,
        payload: {
          product: res.data.product,
          message: "Product details fetched!",
        },
      });
    }
  };
};

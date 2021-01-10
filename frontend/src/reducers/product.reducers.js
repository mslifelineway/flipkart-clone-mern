import { productActionTypes } from "../actions/action-types";

const initialState = {
  error: null,
  loading: false,
  message: "",
  products: [],
  product: null,
};

const productReducer = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    case productActionTypes.GET_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
        message: action.payload.message
          ? action.payload.message
          : "Fetching products data...",
      };
      break;
    case productActionTypes.GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        loading: false,
        message: action.payload.message ? action.payload.message : "",
      };
      break;
    case productActionTypes.GET_PRODUCT_FAILURE:
      state = {
        ...state,
        products: action.payload.products,
        loading: false,
        message: action.payload.message
          ? action.payload.message
          : "Failed to get the products!",
        error: action.payload.error ? action.payload.error : "",
      };
      break;
    case productActionTypes.ADD_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: false,
        message: action.message ? action.message : "Adding the product data...",
      };
      break;
    case productActionTypes.ADD_PRODUCT_SUCCESS:
      let products = state.products;
      products.push(action.payload.product);
      state = {
        ...state,
        loading: false,
        message: action.payload.message
          ? action.payload.message
          : "Product added successfully!",
      };
      break;
    case productActionTypes.GET_PRODUCT_DETAILS_REQUEST:
      state = {
        ...state,
        message: "Fetching product details...",
        loading: true,
      };
      break;
    case productActionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
        product: action.payload.product
      };
      break;
    default:
      break;
  }
  return state;
};

export default productReducer;

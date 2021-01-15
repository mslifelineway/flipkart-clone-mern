import { productActionTypes } from "../actions/action-types";

const initialState = {
  products: [],
  productsByPrice: {
    under5K: [],
    under10K: [],
    under15K: [],
    under20K: [],
    under25K: [],
    under30K: [],
  },
};

const productReducer = (state = initialState, action) => {
    console.log(action)
  switch (action.type) {
    case productActionTypes.GET_PRODUCTS_BY_CATEGORY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: action.payload.productsByPrice,
      };
      break;

    default:
      break;
  }
  return state;
};

export default productReducer;
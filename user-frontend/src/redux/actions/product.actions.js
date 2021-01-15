import axios from "../Axios/axios"
import { productActionTypes } from "./action-types";

export const getProductsByCategorySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/category/${slug}/products`);
        if(res.status === 200) {
            const {products, productsByPrice } = res.data;
            dispatch({
                type: productActionTypes.GET_PRODUCTS_BY_CATEGORY_SLUG,
                payload: {
                    products,
                    productsByPrice
                }
            })
        }
        else {
            console.log("--- error occure while fetching products by category slug...")
        }
    }
}
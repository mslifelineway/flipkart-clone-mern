import axios from "../Axios/axios"
import { categoryActionTypes } from "./action-types";

export const getAllCategories = () => {
    return async (dispatch) => {
        dispatch({
            type: categoryActionTypes.GET_ALL_CATEGORIES_REQUEST,
        })
        const res = await axios.get("/category/getCategories");
        if (res.status === 200) {
            const { result, message } = res.data;
            dispatch({
                type: categoryActionTypes.GET_ALL_CATEGORIES_SUCCESS,
                payload: {
                    categories: result,
                    message: message,
                }
            })
        } else {
            const { error, message } = res.data;
            dispatch({
                type: categoryActionTypes.GET_ALL_CATEGORIES_FAILURE,
                payload: {
                    error: error,
                    message: message
                }
            })
        }
    }
}

//add category
export const addCategory = (form) => {
    return async dispatch => {
        dispatch({
            type: categoryActionTypes.ADD_CATEGORY_REQUEST,
        })
        const res = await axios.post(`/category/addCategory`, form);
        console.log("response: --- " + JSON.stringify(res))
        if (res.status === 201)
            dispatch({
                type: categoryActionTypes.ADD_CATEOGRY_SUCCESS,
                payload: {
                    message: res.data.message,
                    category: res.data.result
                }
            })
        else dispatch({
            type: categoryActionTypes.ADD_CATEGORY_FAILURE,
            payload: {
                error: res.data.error,
                message: res.data.message
            }
        })
    }
}
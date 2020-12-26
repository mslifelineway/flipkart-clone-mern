const { categoryActionTypes } = require("../actions/action-types")

const initialState = {
    error: null,
    loading: false,
    message: '',
    categories: []
}

const categoryReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case categoryActionTypes.GET_ALL_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryActionTypes.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                loading: false,
                message: action.payload.message
            }
            break;
        case categoryActionTypes.GET_ALL_CATEGORIES_FAILURE:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
            break;

        case categoryActionTypes.ADD_CATEGORY_REQUEST:
            state = { ...state, loading: true }
            break;

        case categoryActionTypes.ADD_CATEOGRY_SUCCESS:
            const category = action.payload.category;
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                categories: buildCategories(state.categories, category, category.parentId ? category.parentId : null)
            }
            break;

        case categoryActionTypes.ADD_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                error: action.payload.error
            }
            break;

        default: break
    }
    return state;
}

export default categoryReducer;

const buildCategories = (categories, category, parentId) => {
    let categoryList = [];
    
    for (let cat of categories) {
        if (cat._id === parentId) {
            categoryList.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ?
                    buildCategories(
                        [...cat.children, {
                            _id: category._id,
                            name: category.name,
                            slug: category.slug,
                            parentId: category.parentId,
                            children: category.children,
                        }],
                        category,
                        parentId
                    ) : []
            });
        } else {
            categoryList.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ?
                    buildCategories(cat.children, category, parentId) : []
            });
        }
    }

    // //if there is no parent of inserted category then add this to categoryList directly, but adding at last in categoryList 
    // categoryList.push({
    //     ...category,
    //     children: category.children ? category.children : []
    // })
    return categoryList;
}
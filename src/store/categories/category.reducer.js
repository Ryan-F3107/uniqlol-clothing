import { CATEGORIES_ACTION_TYPE } from "./category.types";

export const CATEGORIES_INTIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
};

export const categoriesReducer = (state = CATEGORIES_INTIAL_STATE, action = {} ) => {
    const {type, payload} = action;
    switch(type){
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START: //when we begin the api request
            return {...state, isLoading: true};
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
            return {...state, categories: payload, isLoading: false};
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED:
            return {...state, error: payload ,isLoading: false}
        default:
            return state;
    }
}
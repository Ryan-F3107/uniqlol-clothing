import { CATEGORIES_ACTION_TYPE } from "./category.types";

export const CATEGORIES_INTIAL_STATE = {
    categoriesMap: {},
}

export const categoriesReducer = (state = CATEGORIES_INTIAL_STATE, action = {} ) => {
    const {type, payload} = action;
    switch(type){
        case CATEGORIES_ACTION_TYPE.SET_CATEGORIES_MAP:
            return {...state, categoriesMap: payload};
        default:
            return state;
    }
}
import { takeLatest, all, call, put } from "redux-saga/effects";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {fetchCategoriesSuccess, fetchCategoriesFailed} from './category.action';
import { CATEGORIES_ACTION_TYPE } from "./category.types";

//call- if you have a function and want to convert it into at effect.
export function* fetchCategoriesAsync(){
    try{
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch(error){
        yield put(fetchCategoriesFailed(error));
    }
}
//take- recieve actions
export function* onFetchCategories(){
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

//all- run everything and only complete when everything is done
export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}

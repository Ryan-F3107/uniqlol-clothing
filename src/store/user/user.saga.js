import {all, call, put, takeLatest} from 'redux-saga/effects';
import { signInSuccess, signInFailed } from './user.action';
import { USER_ACTION_TYPE } from './user.types';
import { getCurrentUser, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails){
    try{
        const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
    } catch(error){
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error){
        yield put(signInFailed(error));
    }
}
export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* userSagas() {
    yield all([call(onCheckUserSession)]);
}
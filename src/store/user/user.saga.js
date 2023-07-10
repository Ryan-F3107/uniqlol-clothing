import { all, call, put, takeLatest } from 'redux-saga/effects';
import { signInSuccess, signInFailed, signUpSuccess,signUpFailed,signOutSuccess,signOutFailed } from './user.action';
import { USER_ACTION_TYPE } from './user.types';
import { 
    getCurrentUser, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup, 
    signInAuthUserFromEmailandPassword, 
    createAuthUserFromEmailandPassword,
    signOutUser
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
    } catch (error) {
        yield put(signInFailed(error));
    }
}
export function* signInAfterSignUp({ payload:{ user, additionalDetails }}){
    yield call(getSnapshotFromUserAuth, user, additionalDetails); 
}
export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}
export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}
export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInAuthUserFromEmailandPassword,
            email,
            password
        )
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}
export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* signUp({payload: { email, password, displayName}}){
    try{
        const {user} = yield call(createAuthUserFromEmailandPassword, email, password)
        yield put(signUpSuccess(user, { displayName }));
    } catch(error){
        yield put(signUpFailed(error));
    }
}

export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* signOut(){
    try{
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch(error){
        yield put(signOutFailed(error));
    }
}
export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut);
}
export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ]);
}
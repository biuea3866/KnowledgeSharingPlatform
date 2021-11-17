import { createAction, handleActions } from "redux-actions";
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";

const INITIALIZE = 'user/INITIALIZE';

const [SAVE_USER,
       SAVE_USER_SUCCESS,
       SAVE_USER_FAILURE] = createRequestActionTypes('user/SAVE_USER');

const LOGOUT = 'user/LOGOUT';

export const initialize = createAction(INITIALIZE, form => form);

export const saveUser = createAction(SAVE_USER);

export const logout = createAction(LOGOUT);

const saveUserSaga = createRequestSaga(SAVE_USER, authAPI.getUser);

function logoutSaga() {
    try {
        call(authAPI.logout);

        localStorage.removeItem('token');

        localStorage.removeItem('user');
    } catch(e) {
        console.log(e);
    }
}

export function* userSaga() {
    yield takeLatest(SAVE_USER, saveUserSaga);
    yield takeLatest(LOGOUT, logoutSaga);
};

const initialState = {
    user: null,
    error: null,
};

const user = handleActions(
    {
        [INITIALIZE]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [SAVE_USER_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user,
        }),
        [SAVE_USER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error
        }),
    },
    initialState
);

export default user;
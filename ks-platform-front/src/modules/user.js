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

const [GET_USERS,
       GET_USERS_SUCCESS,
       GET_USERS_FAILURE] = createRequestActionTypes('user/GET_USERS');

const LOGOUT = 'user/LOGOUT';

export const initialize = createAction(INITIALIZE, form => form);

export const saveUser = createAction(SAVE_USER);

export const getUsers = createAction(GET_USERS);

export const logout = createAction(LOGOUT);

const saveUserSaga = createRequestSaga(SAVE_USER, authAPI.getUser);

const getUsersSaga = createRequestSaga(GET_USERS, authAPI.getUsers);

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
    yield takeLatest(GET_USERS, getUsersSaga);
    yield takeLatest(LOGOUT, logoutSaga);
};

const initialState = {
    user: null,
    users: null,
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
        [GET_USERS_SUCCESS]: (state, { payload: users }) => ({
            ...state,
            users,
        }),
        [GET_USERS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error
        })
    },
    initialState
);

export default user;
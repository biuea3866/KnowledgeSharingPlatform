import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects'
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [LOGIN,
       LOGIN_SUCCESS,
       LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');

const [REGISTER,
       REGISTER_SUCCESS,
       REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');

const [CHECK_EMAIL,
       CHECK_EMAIL_SUCCESS,
       CHECK_EMAIL_FAILURE] = createRequestActionTypes('auth/CHECK_EMAIL');

const [CHECK_NICKNAME,
       CHECK_NICKNAME_SUCCESS,
       CHECK_NICKNAME_FAILURE] = createRequestActionTypes('auth/CHECK_NICKNAME');

export const changeField = createAction(
    CHANGE_FIELD, ({
        form,
        key,
        value
    }) => ({
        form,
        key,
        value
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);

export const login = createAction(LOGIN, ({
    email,
    password,
}) => ({
    email,
    password
}));

export const register = createAction(REGISTER, ({
    email,
    password,
    nickname,
    name,
    department,
    role,
    is_active
}) => ({
    email,
    password,
    nickname,
    name,
    department,
    role,
    is_active
}));

export const checkEmail = createAction(CHECK_EMAIL, email => email);

export const checkNickname = createAction(CHECK_NICKNAME, nickname => nickname);

const loginSaga = createRequestSaga(LOGIN, authAPI.login);

const registerSaga = createRequestSaga(REGISTER, authAPI.register);

const checkEmailSaga = createRequestSaga(CHECK_EMAIL, authAPI.checkEmail);

const checkNicknameSaga = createRequestSaga(CHECK_NICKNAME, authAPI.checkNickname);

export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(CHECK_EMAIL, checkEmailSaga);
    yield takeLatest(CHECK_NICKNAME, checkNicknameSaga);
};

const initialState = {
    register: {
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
        name: '',
        department: '',
        role: '',
        is_active: true
    },
    login: {
        email: '',
        password: '',
    },
    checkedEmail: null,
    checkedNickname: null,
    auth: null,
    authError: null,
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value }}) => 
        produce(state, draft => {
            draft[form][key] = value;
        }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth
        }),
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error
        }),
        [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth
        }),
        [REGISTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error
        }),
        [CHECK_EMAIL_SUCCESS]: (state, { payload: checkedEmail }) => ({
            ...state,
            checkedEmail,
        }),
        [CHECK_EMAIL_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error
        }),
        [CHECK_NICKNAME_SUCCESS]: (state, { payload: checkedNickname }) => ({
            ...state,
            checkedNickname
        }),
        [CHECK_NICKNAME_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error
        }),
    },
    initialState,
);

export default auth;
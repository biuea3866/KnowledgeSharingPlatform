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

const [DELETE_USER,
       DELETE_USER_SUCCESS,
       DELETE_USER_FAILURE] = createRequestActionTypes('auth/DELETE_USER');

const [MODIFY_USER,
       MODIFY_USER_SUCCESS,
       MODIFY_USER_FAILURE] = createRequestActionTypes('auth/MODIFY_USER');

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

export const deleteUser = createAction(DELETE_USER, ({
    is_active,
    user_id
}) => ({ 
    is_active,
    user_id
}));

export const modifyUser = createAction(MODIFY_USER, ({
    user_id,
    password,
    nickname
}) => ({
    user_id,
    password,
    nickname
}));

const loginSaga = createRequestSaga(LOGIN, authAPI.login);

const registerSaga = createRequestSaga(REGISTER, authAPI.register);

const checkEmailSaga = createRequestSaga(CHECK_EMAIL, authAPI.checkEmail);

const checkNicknameSaga = createRequestSaga(CHECK_NICKNAME, authAPI.checkNickname);

const deleteUserSaga = createRequestSaga(DELETE_USER, authAPI.deleteUser);

const modifyUserSaga = createRequestSaga(MODIFY_USER, authAPI.modifyUser);

export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(CHECK_EMAIL, checkEmailSaga);
    yield takeLatest(CHECK_NICKNAME, checkNicknameSaga);
    yield takeLatest(DELETE_USER, deleteUserSaga);
    yield takeLatest(MODIFY_USER, modifyUserSaga);
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
    delete: {
        is_active: false,
        user_id: ''
    },
    modify: {
        password: '',
        passwordConfirm: '',
        nickname: '',
        user_id: ''
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
        [DELETE_USER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            auth,
        }),
        [DELETE_USER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
        [MODIFY_USER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            auth
        }),
        [MODIFY_USER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        })
    },
    initialState,
);

export default auth;
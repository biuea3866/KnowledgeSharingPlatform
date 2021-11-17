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

export const getUser = createAction(GET_USER);

const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga);
};

const initialState = {
    register: {
        email: '',
        password: '',
        nickname: '',
        name: '',
        department: '',
        role: ''
    },
    login: {
        email: '',
        password: '',
    },
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
        })
    },
    initialState,
);

export default auth;
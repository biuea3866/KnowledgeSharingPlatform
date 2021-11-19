import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postAPI from '../lib/api/post';
import { takeLatest } from "redux-saga/effects";
import produce from "immer";

const INITIALIZE_FORM = 'post/INITIALIZE_FORM';

const CHANGE_FIELD = 'post/CHANGE_FIELD';

const [WRITE_POST,
       WRITE_POST_SUCCESS,
       WRITE_POST_FAILURE] = createRequestActionTypes('post/WRITE_POST');

export const initialize = createAction(INITIALIZE_FORM, form => form);

export const changeField = createAction(CHANGE_FIELD, ({
    form,
    key,
    value
}) => ({
    form,
    key,
    value
}));

export const writePost = createAction(WRITE_POST, ({
    title,
    contents,
    is_secret,
    user_id
}) => ({
    title,
    contents,
    is_secret,
    user_id
}));

const writePostSaga = createRequestSaga(WRITE_POST, postAPI.write);

export function* postSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
}

const initialState = {
    write: {
        title: '',
        contents: '',
        is_secret: false,
        user_id: ''
    },
    post: null,
    postError: null
};

const post = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value }}) => 
        produce(state, draft => {
            draft[form][key] = value;
        }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post
        }),
        [WRITE_POST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            postError: error,
        })
    },
    initialState
);

export default post;
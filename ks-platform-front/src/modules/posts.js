import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postAPI from '../lib/api/post';
import { takeLatest } from "redux-saga/effects";
import produce from "immer";

const INITIALIZE_FORM = 'posts/INITIALIZE_FORM';

const CHANGE_FIELD = 'posts/CHANGE_FIELD';

const [SEARCH_POSTS,
       SEARCH_POSTS_SUCCESS,
       SEARCH_POSTS_FAILURE] = createRequestActionTypes('posts/SEARCH_POSTS');

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

export const searchPosts = createAction(SEARCH_POSTS, keyword => keyword);

const searchPostsSaga = createRequestSaga(SEARCH_POSTS, postAPI.search);

export function* postsSaga() {
    yield takeLatest(SEARCH_POSTS, searchPostsSaga);
};

const initialState = {
    keyword: '',
    posts: null,
    postsError: null,
};

const posts = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { key, value }}) => ({
            ...state,
            [key]: value
        }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form]
        }),
        [SEARCH_POSTS_SUCCESS]: (state, { payload: posts }) => ({
            ...state,
            posts
        }),
        [SEARCH_POSTS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            postsError: error
        })
    },
    initialState,
);

export default posts;
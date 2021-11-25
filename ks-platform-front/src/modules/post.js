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

const [GET_POST,
       GET_POST_SUCCESS,
       GET_POST_FAILURE] = createRequestActionTypes('post/GET_POST');

const [ADD_TAG,
       ADD_TAG_SUCCESS,
       ADD_TAG_FAILURE] = createRequestActionTypes('post/ADD_TAG');

const [ADD_COMMENT,
       ADD_COMMENT_SUCCESS,
       ADD_COMMENT_FAILURE] = createRequestActionTypes('post/ADD_COMMENT');

const [EDIT_POST,
       EDIT_POST_SUCCESS,
       EDIT_POST_FAILURE] = createRequestActionTypes('post/EDIT_POST');

const UNLOAD_POST = 'post/UNLOAD_POST';

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

export const getPost = createAction(GET_POST, post_id => post_id);

export const addTag = createAction(ADD_TAG, ({
    tag,
    post_id
}) => ({
    tag,
    post_id
}));

export const addComment = createAction(ADD_COMMENT, ({
    content,
    name,
    is_secret,
    post_id
}) => ({
    content,
    name,
    is_secret,
    post_id
}));

export const editPost = createAction(EDIT_POST, ({
    title,
    contents,
    is_secret,
    post_id
}) => ({
    title,
    contents,
    is_secret,
    post_id
}));

export const unloadPost = createAction(UNLOAD_POST);

const writePostSaga = createRequestSaga(WRITE_POST, postAPI.write);

const getPostSaga = createRequestSaga(GET_POST, postAPI.getPost);

const addTagSaga = createRequestSaga(ADD_TAG, postAPI.addTag);

const addCommentSaga = createRequestSaga(ADD_COMMENT, postAPI.addComment);

const editPostSaga = createRequestSaga(EDIT_POST, postAPI.edit);

export function* postSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(ADD_TAG, addTagSaga);
    yield takeLatest(ADD_COMMENT, addCommentSaga);
    yield takeLatest(EDIT_POST, editPostSaga);
};

const initialState = {
    write: {
        title: '',
        contents: '',
        is_secret: false,
        user_id: ''
    },
    tags: {
        tag: ''
    },
    comment: {
        content: '',
        name: '',
        is_secret: false,
        post_id: ''
    },
    edit: {
        title: '',
        contents: '',
        is_secret: false,
        post_id: ''
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
        }),
        [GET_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post,
        }),
        [GET_POST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            postError: error
        }),
        [ADD_TAG_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post
        }),
        [ADD_TAG_FAILURE]: (state, { payload: error }) => ({
            ...state,
            postError: error
        }),
        [ADD_COMMENT_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post
        }),
        [ADD_COMMENT_FAILURE]: (state, { payload: error }) => ({
            ...state,
            portError: error
        }),
        [EDIT_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post
        }),
        [EDIT_POST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            postError: error
        }),
        [UNLOAD_POST]: () => initialState,
    },
    initialState,
);

export default post;
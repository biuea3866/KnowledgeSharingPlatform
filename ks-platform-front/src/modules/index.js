import { combineReducers } from 'redux';
import loading from './loading';
import auth, { authSaga } from './auth';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';

const rootReducer = combineReducers(
    {
        loading,
        auth,
        user,
        post,
        posts
    }
);

export function* rootSaga() {
    yield all([authSaga(),
               userSaga(),
               postSaga(),
               postsSaga()]);
};

export default rootReducer;
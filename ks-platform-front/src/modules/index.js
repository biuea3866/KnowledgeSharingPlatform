import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loading from './loading';
import auth, { authSaga } from './auth';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['loading',
                'auth',
                'user',
                'post',
                'posts']
};

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

export default persistReducer(persistConfig,
                              rootReducer);
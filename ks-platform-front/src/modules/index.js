import { combineReducers } from 'redux';
import loading from './loading';
import auth, { authSaga } from './auth';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';

const rootReducer = combineReducers(
    {
        loading,
        auth,
        user
    }
);

export function* rootSaga() {
    yield all([authSaga(),
               userSaga()]);
};

export default rootReducer;
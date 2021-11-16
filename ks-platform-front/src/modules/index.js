import { combineReducers } from 'redux';
import loading from './loading';
import auth, { authSaga } from './auth';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers(
    {
        loading,
        auth,
    }
);

export function* rootSaga() {
    yield all([authSaga()]);
};

export default rootReducer;
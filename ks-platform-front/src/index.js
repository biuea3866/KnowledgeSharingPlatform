import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import rootReducer, { rootSaga } from './modules';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { saveUser } from './modules/user';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

const persistor = persistStore(store);

function loadUser() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));

        if(!user) {
            return;
        }

        store.dispatch(saveUser());
    } catch(e) {
        console.log(e);
    }
}

sagaMiddleware.run(rootSaga);

loadUser();

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate persistor={ persistor }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
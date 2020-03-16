import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router';

import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
import tracksReducer from "./store/reducers/tracksReducer";
import artistsReducer from "./store/reducers/artistsReducer";
import albumsReducer from "./store/reducers/albumsReducer";
import usersReducer from "./store/reducers/usersReducer";
const history = createBrowserHistory();

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log('Could not save state');
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    }  catch (e) {
        return undefined;
    }
};

const rootReducer = combineReducers({
    router: connectRouter(history),
    tracks: tracksReducer,
    artists: artistsReducer,
    albums: albumsReducer,
    users: usersReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));
const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    })
});

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
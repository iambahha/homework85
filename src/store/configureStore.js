import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import artistsReducer from '../store/reducers/artistsReducer';
import albumsReducer from '../store/reducers/albumsReducer';
import tracksReducer from '../store/reducers/tracksReducer';
import usersReducer from '../store/reducers/usersReducer';
import trackHistoryReducer from '../store/reducers/trackHistoryReducer';

import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  users: usersReducer,
  trackHistory: trackHistoryReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
  localStorageMiddleware
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

export default store;

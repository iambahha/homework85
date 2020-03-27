import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import artistsReducer from '../store/reducers/artistsReducer';
import albumsReducer from '../store/reducers/albumsReducer';
import tracksReducer from '../store/reducers/tracksReducer';
import usersReducer from '../store/reducers/usersReducer';
import trackHistoryReducer from '../store/reducers/trackHistoryReducer';

import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import axiosApi from '../axios-api';

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
  });
});

axiosApi.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = store.getState().users.user.token;
  } catch (e) {
    console.log(e)
  }

  return config;
});

export default store;

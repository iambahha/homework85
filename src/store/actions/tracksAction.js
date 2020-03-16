import axiosApi from '../../axios-api';
import {push} from 'connected-react-router';

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const FETCH_HISTORY_REQUEST = 'FETCH_HISTORY_REQUEST';
export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';
export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE';

export const SAVE_HISTORY_REQUEST = 'SAVE_HISTORY_REQUEST';
export const SAVE_HISTORY_SUCCESS = 'SAVE_HISTORY_SUCCESS';
export const SAVE_HISTORY_FAILURE = 'SAVE_HISTORY_FAILURE';

export const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});
export const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, error});

export const fetchHistoryRequest = () => ({type: FETCH_HISTORY_REQUEST});
export const fetchHistorySuccess = history => ({type: FETCH_HISTORY_SUCCESS, history});
export const fetchHistoryFailure = error => ({type: FETCH_HISTORY_FAILURE, error});

export const saveHistoryRequest = () => ({type: SAVE_HISTORY_REQUEST});
export const saveHistorySuccess = () => ({type: SAVE_HISTORY_SUCCESS});
export const saveHistoryFailure = error => ({type: SAVE_HISTORY_FAILURE, error});


export const fetchTracks = (id, token) => {
    return async dispatch => {
        try{
            if (!token) {
            dispatch(push('/login'));
        } else {
            dispatch(fetchTracksRequest());
            const response = await axiosApi.get('/tracks' + id, {headers: {Authorization: token}});
            dispatch(fetchTracksSuccess(response.data));
            }
        } catch(e){
            dispatch(fetchTracksFailure(e));
            console.error(e);
        }
    }
};

export const fetchHistory = (token) => {
    return async dispatch => {
        try{
            if (!token) {
                dispatch(push('/login'));
            } else {
                dispatch(fetchHistoryRequest());
                const response = await axiosApi.get('/track_history', {headers: {Authorization: token}});
                dispatch(fetchHistorySuccess(response.data));
            }
        } catch(e){
            dispatch(fetchHistoryFailure(e));
            console.error(e);
        }
    }
};

export const saveHistory = (trackId, token) => {
    return async dispatch => {
        try{
            if (!token) {
                dispatch(push('/login'));
            } else {
                dispatch(saveHistoryRequest());
                const response = await axiosApi.post('/track_history', {track: trackId}, {headers: {Authorization: token}});
                dispatch(saveHistorySuccess(response.data));
            }
        } catch(e){
            dispatch(saveHistoryFailure(e));
            console.error(e);
        }
    }
};


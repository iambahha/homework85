import axiosApi from '../../axios-api';

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});
export const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, error});

export const fetchTracks = (albumId) => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('tracks?album=' + albumId);
            dispatch(fetchTracksSuccess(response.data));
        } catch(e) {
            dispatch(fetchTracksFailure(e));
            console.error(e);
        }
    }
};
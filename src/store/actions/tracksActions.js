import axiosApi from '../../axios-api';
import {NotificationManager} from "react-notifications";

export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const CREATE_TRACK_SUCCESS = 'CREATE_TRACK_SUCCESS';

export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});
export const createTracksSuccess = () => ({type: CREATE_TRACK_SUCCESS});

export const fetchTrack = id => {
	return async dispatch => {
		const response = await axiosApi.get('/tracks?album=' + id);
		dispatch(fetchTracksSuccess(response.data));
	};
};

export const createTrack = trackData => {
	return async dispatch => {
		await axiosApi.post('/tracks', trackData);
		dispatch(createTracksSuccess());
		NotificationManager.success('You added new track!');
	};
};

export const publishTrack = (id, publish, albumId) => {
	return async dispatch => {
		await axiosApi.post(`/tracks/${id}/toggle_published`, publish);
		dispatch(fetchTrack(albumId));
		NotificationManager.success('You published an track!');
	};
};

export const removedTrack = (id, remove, albumId) => {
	return async dispatch => {
		await axiosApi.post(`/tracks/${id}/toggle_removed`, remove);
		dispatch(fetchTrack(albumId));
		NotificationManager.success('You removed an track!');
	};
};


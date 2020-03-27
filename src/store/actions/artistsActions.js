import axiosApi from '../../axios-api';
import {NotificationManager} from "react-notifications";

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const CREATE_ARTIST_SUCCESS = 'CREATE_ARTIST_SUCCESS';

export const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, artists});
export const createArtistsSuccess = () => ({type: CREATE_ARTIST_SUCCESS});

export const fetchArtist = () => {
	return async dispatch => {
		const response = await axiosApi.get('/artists');
		dispatch(fetchArtistsSuccess(response.data));
	};
};

export const createArtist = artistData => {
	return async dispatch => {
		await axiosApi.post('/artists', artistData);
		dispatch(createArtistsSuccess());
		NotificationManager.success('You added new artist!');
	};
};

export const publishArtist = (id, publish) => {
	return async dispatch => {
		await axiosApi.post(`/artists/${id}/toggle_published`, publish)
		dispatch(fetchArtist());
		NotificationManager.success('You published an artist!');
	};
};

export const removedArtist = (id, remove) => {
	return async dispatch => {
		await axiosApi.post(`/artists/${id}/toggle_removed`, remove);
		dispatch(fetchArtist());
		NotificationManager.success('You removed an artist!');
	};
};


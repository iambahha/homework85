import axiosApi from '../../axios-api';
import {NotificationManager} from "react-notifications";

export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';

export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const createAlbumSuccess = () => ({type: CREATE_ALBUM_SUCCESS});

export const fetchAlbums = () => {
	return async dispatch => {
		const response = await axiosApi.get('/albums');
		dispatch(fetchAlbumsSuccess(response.data))
	};
};

export const fetchAlbum = (id) => {
	return async dispatch => {
		const response = await axiosApi.get('/albums/' + id);
		dispatch(fetchAlbumsSuccess(response.data))
	};
};

export const createAlbum = albumData => {
	return async dispatch => {
		await axiosApi.post('/albums', albumData);
		dispatch(createAlbumSuccess());
		NotificationManager.success('You added new album');
	};
};

export const publishAlbum = (id, publish, artistId) => {
	return async dispatch => {
		await axiosApi.post(`/albums/${id}/toggle_published`, publish);
		dispatch(fetchAlbum(artistId));
		NotificationManager.success('You published an album!');
	};
};

export const removedAlbum = (id, remove, artistId) => {
	return async dispatch => {
		await axiosApi.post(`/albums/${id}/toggle_removed`, remove);
		dispatch(fetchAlbum(artistId));
		NotificationManager.success('You removed an album!');
	};
};


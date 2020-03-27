import axiosApi from '../../axios-api';
import {push} from 'connected-react-router';
import {NotificationManager} from "react-notifications";

export const TRACK_HISTORY_SUCCESS = 'TRACK_HISTORY_SUCCESS';

const fetchTrackHistorySuccess = trackHistory => ({type: TRACK_HISTORY_SUCCESS, trackHistory});

export const fetchTrackHistory = trackData => {
	return async (dispatch, getState) => {
		const user = getState().users.user;
		if (!user) {
			dispatch(push('/login'))
		} else {
			await axiosApi.post('/track_history', trackData, {headers: {'Authorization': user.token}});
			dispatch(fetchTrackHistorySuccess());
			NotificationManager.success('You listened to the song!');
		}
	};
};

export const trackHistory = () => {
	return async (dispatch, getState) => {
		const token = getState().users.user.token;
		const response = await axiosApi.get('/track_history', {headers: {'Authorization': token}});
		dispatch(fetchTrackHistorySuccess(response.data));
	}
};

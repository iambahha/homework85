import axiosApi from '../../axios-api';

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const fetchAlbumsRequest = () => ({type: FETCH_ALBUMS_REQUEST});
export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const fetchAlbumsFailure = error => ({type: FETCH_ALBUMS_FAILURE, error});

export const fetchAlbums = (id) => {
    return async dispatch => {
        try{
            const response = await axiosApi.get('albums?artist=' + id);
            dispatch(fetchAlbumsSuccess(response.data));
        } catch(e){
            dispatch(fetchAlbumsFailure(e));
            console.error(e);
        }
    }
};

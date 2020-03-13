import {FETCH_TRACKS_FAILURE, FETCH_TRACKS_SUCCESS} from "../actions/tracksAction";

const initialState = {
    tracks: [],
    error: null
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_SUCCESS:
            return {...state, tracks: action.tracks};
        case FETCH_TRACKS_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default tracksReducer;



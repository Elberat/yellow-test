import {
    GET_GENRES_ERROR,
    GET_GENRES_LOADING,
    GET_GENRES_SUCCESS,
} from '../constants';

export const genresLoading = () => ({ type: GET_GENRES_LOADING });

export const genresSuccess = (data) => ({
    type: GET_GENRES_SUCCESS,
    payload: data,
});

export const genresError = (msg) => ({ type: GET_GENRES_ERROR, payload: msg });

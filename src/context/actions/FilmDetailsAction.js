import {
    GET_ONE_FILM_ERROR,
    GET_ONE_FILM_LOADING,
    GET_ONE_FILM_SUCCESS,
} from '../constants';

export const getOneFilmLoading = () => ({ type: GET_ONE_FILM_LOADING });

export const getoneFilmSuccess = (data) => ({
    type: GET_ONE_FILM_SUCCESS,
    payload: data,
});

export const getOneFilmError = (msg) => ({
    type: GET_ONE_FILM_ERROR,
    payload: msg,
});

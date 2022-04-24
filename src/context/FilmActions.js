import {
    GET_FILMS_ERROR,
    GET_FILMS_LOADING,
    GET_FILMS_SUCCESS,
    SET_SEARCH_RESULTS,
} from './constants';

export const filmsLoading = () => ({ type: GET_FILMS_LOADING });

export const filmsSuccess = (data) => ({
    type: GET_FILMS_SUCCESS,
    payload: data,
});

export const filmsError = (msg) => ({ type: GET_FILMS_ERROR, payload: msg });

export const setSearchResults = (data) => ({
    type: SET_SEARCH_RESULTS,
    payload: data,
});

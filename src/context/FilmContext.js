import React, { useContext, useReducer, useState } from 'react';
import axios from 'axios';
import { POPULAR_API, BASE_API, API_KEY_V3, SEARCH_API } from '../constants';
import {
    GET_FILMS_ERROR,
    GET_FILMS_LOADING,
    GET_FILMS_SUCCESS,
    SET_SEARCH_RESULTS,
    GET_ONE_FILM_ERROR,
    GET_ONE_FILM_LOADING,
    GET_ONE_FILM_SUCCESS,
} from './constants';

import { filmsError, filmsLoading, filmsSuccess } from './FilmActions';

import {
    getoneFilmSuccess,
    getOneFilmError,
    getOneFilmLoading,
} from './FilmDetailsAction';

const filmsContext = React.createContext();

export const useFilms = () => useContext(filmsContext);

const INIT_STATE = {
    films: [],
    fimlDetails: {
        loading: false,
        error: null,
        film: null,
    },
    loading: false,
    error: null,
    totalPages: null,
    total_results: null,
};
const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_FILMS_LOADING:
            return { ...state, loading: true };

        case GET_FILMS_ERROR:
            return {
                ...state,
                loading: false,
                films: [],
                error: action.payload,
            };

        case GET_FILMS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                films: action.payload.results,
                totalPages: action.payload.total_pages,
                totalResult: action.payload.total_results,
            };

        case SET_SEARCH_RESULTS:
            return {
                ...state,
                loading: false,
                error: null,
                films: action.payload.results,
            };

        case GET_ONE_FILM_LOADING:
            return {
                ...state,
                fimlDetails: {
                    ...state.fimlDetails,
                    loading: true,
                },
            };

        case GET_ONE_FILM_ERROR:
            return {
                ...state,
                fimlDetails: {
                    ...state.fimlDetails,
                    loading: false,
                    error: action.payload,
                    film: null,
                },
            };

        case GET_ONE_FILM_SUCCESS:
            return {
                ...state,
                fimlDetails: {
                    ...state.fimlDetails,
                    loading: false,
                    error: null,
                    film: action.payload,
                },
            };
        default:
            return state;
    }
};
const FilmsContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const fetchFilms = async (page) => {
        dispatch(filmsLoading());
        try {
            const { data } = await axios(`${POPULAR_API}${page}`);
            // const { data } = await axios(`${BASE_API}/${window.location.search}`);
            // console.log(window.location.search);
            dispatch(filmsSuccess(data));
        } catch (error) {
            console.log(error.message);
            dispatch(filmsError(error.message));
        }
    };

    // SET_SEARCH_RESULTS

    const fetchSearchFilms = async (q) => {
        dispatch(filmsLoading());
        try {
            const { data } = await axios(`${SEARCH_API}${q}`);
            // const { data } = await axios(`${BASE_API}/${window.location.search}`);
            // console.log(window.location.search);
            dispatch(filmsSuccess(data));
        } catch (error) {
            console.log(error.message);
            dispatch(filmsError(error.message));
        }
    };

    const fetchOneFilm = async (id) => {
        dispatch(getOneFilmLoading());
        try {
            const { data } = await axios(
                `${BASE_API}${id}?api_key=${API_KEY_V3}`
            );
            dispatch(getoneFilmSuccess(data));
        } catch (error) {
            console.log(error.message);
            dispatch(getOneFilmError(error.message));
        }
    };

    return (
        <filmsContext.Provider
            value={{
                films: state.films,
                loading: state.loading,
                error: state.error,
                page: state.page,
                totalPages: state.totalPages,
                total_results: state.totalResult,
                fetchFilms,
                oneFimlDetails: state.fimlDetails.film,
                oneFilmError: state.fimlDetails.error,
                OneFilmsLoading: state.fimlDetails.loading,
                fetchOneFilm,
                fetchSearchFilms,
            }}
        >
            {children}
        </filmsContext.Provider>
    );
};

export default FilmsContext;

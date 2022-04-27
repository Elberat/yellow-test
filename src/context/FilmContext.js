import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import {
    POPULAR_API,
    BASE_API,
    API_KEY_V3,
    SEARCH_API,
    GENRES_API,
} from '../constants';
import {
    GET_FILMS_ERROR,
    GET_FILMS_LOADING,
    GET_FILMS_SUCCESS,
    SET_SEARCH_RESULTS,
    GET_ONE_FILM_ERROR,
    GET_ONE_FILM_LOADING,
    GET_ONE_FILM_SUCCESS,
    GET_GENRES_ERROR,
    GET_GENRES_LOADING,
    GET_GENRES_SUCCESS,
    GET_REC_ERROR,
    GET_REC_LOADING,
    GET_REC_SUCCESS,
    GET_SIMILAR_ERROR,
    GET_SIMILAR_LOADING,
    GET_SIMILAR_SUCCESS,
} from './constants';

import {
    filmsError,
    filmsLoading,
    filmsSuccess,
    setSearchResults,
} from './actions/FilmActions';

import {
    getoneFilmSuccess,
    getOneFilmError,
    getOneFilmLoading,
} from './actions/FilmDetailsAction';

import {
    genresError,
    genresLoading,
    genresSuccess,
} from './actions/GenresActions';

import {
    recError,
    recLoading,
    recSuccess,
    similarError,
    similarLoading,
    similarSuccess,
} from './actions/RecAndSimilarActions';

const filmsContext = React.createContext();

export const useFilms = () => useContext(filmsContext);

const INIT_STATE = {
    films: [],
    loading: false,
    error: null,
    fimlDetails: {
        loading: false,
        error: null,
        film: null,
    },
    genresState: {
        loading: false,
        error: null,
        genres: null,
    },
    recState: {
        loading: false,
        error: null,
        rec: null,
    },
    similarState: {
        loading: false,
        error: null,
        similar: null,
    },
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
                films: [...state.films, ...action.payload.results],
                // films: action.payload.results,
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

        case GET_GENRES_LOADING:
            return {
                ...state,
                genresState: {
                    ...state.genresState,
                    loading: true,
                },
            };

        case GET_GENRES_ERROR:
            return {
                ...state,
                genresState: {
                    ...state.genresState,
                    loading: false,
                    error: action.payload,
                    genres: null,
                },
            };

        case GET_GENRES_SUCCESS:
            return {
                ...state,
                genresState: {
                    ...state.genresState,
                    loading: false,
                    error: null,
                    genres: action.payload.genres,
                },
            };
        case GET_REC_LOADING:
            return {
                ...state,
                recState: {
                    ...state.recState,
                    loading: true,
                },
            };

        case GET_REC_ERROR:
            return {
                ...state,
                recState: {
                    ...state.recState,
                    loading: false,
                    error: action.payload,
                    rec: null,
                },
            };

        case GET_REC_SUCCESS:
            return {
                ...state,
                recState: {
                    ...state.recState,
                    loading: false,
                    error: null,
                    rec: action.payload,
                },
            };

        case GET_SIMILAR_LOADING:
            return {
                ...state,
                similarState: {
                    ...state.similarState,
                    loading: true,
                },
            };

        case GET_SIMILAR_ERROR:
            return {
                ...state,
                similarState: {
                    ...state.similarState,
                    loading: false,
                    error: action.payload,
                    similar: null,
                },
            };

        case GET_SIMILAR_SUCCESS:
            return {
                ...state,
                similarState: {
                    ...state.similarState,
                    loading: false,
                    error: null,
                    similar: action.payload,
                },
            };
        default:
            return state;
    }
};
const FilmsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const fetchFilms = async (page) => {
        dispatch(filmsLoading());
        try {
            const { data } = await axios(`${POPULAR_API}${page}`);
            dispatch(filmsSuccess(data));
        } catch (error) {
            console.log(error.message);
            dispatch(filmsError(error.message));
        }
    };

    const fetchSearchFilms = async (q) => {
        dispatch(filmsLoading());
        try {
            const { data } = await axios(`${SEARCH_API}${q}`);
            dispatch(setSearchResults(data));
        } catch (error) {
            console.log(error.message);
            dispatch(filmsError(error.message));
        }
    };

    const fetchOneFilm = async (id) => {
        dispatch(getOneFilmLoading());
        try {
            const { data } = await axios(
                `${BASE_API}movie/${id}?${API_KEY_V3}`
            );
            dispatch(getoneFilmSuccess(data));
        } catch (error) {
            console.log(error.message);
            dispatch(getOneFilmError(error.message));
        }
    };

    const fetchRecs = async (id) => {
        dispatch(recLoading());
        try {
            const { data } = await axios(
                `${BASE_API}movie/${id}/recommendations?${API_KEY_V3}`
            );
            dispatch(recSuccess(data));
        } catch (error) {
            console.log(error.message);
            dispatch(recError(error.message));
        }
    };

    const fetchSimilar = async (id) => {
        dispatch(similarLoading());
        try {
            const { data } = await axios(
                `${BASE_API}movie/${id}/similar?${API_KEY_V3}&limit=10`
            );
            dispatch(similarSuccess(data));
        } catch (error) {
            console.log(error.message);
            dispatch(similarError(error.message));
        }
    };

    const fetchGenres = async () => {
        dispatch(genresLoading());
        try {
            const { data } = await axios(`${GENRES_API}`);
            dispatch(genresSuccess(data));
        } catch (error) {
            console.log(error.message);
            dispatch(genresError(error.message));
        }
    };

    return (
        <filmsContext.Provider
            value={{
                films: state.films,
                loading: state.loading,
                error: state.error,
                fetchFilms,
                oneFimlDetails: state.fimlDetails.film,
                oneFilmError: state.fimlDetails.error,
                OneFilmsLoading: state.fimlDetails.loading,
                fetchOneFilm,
                fetchSearchFilms,
                fetchGenres,
                genresLoading: state.genresState.loading,
                genresError: state.genresState.error,
                genres: state.genresState.genres,
                fetchRecs,
                recError: state.recState.error,
                rec: state.recState.rec,
                recLoading: state.recState.loading,
                fetchSimilar,
                similarError: state.similarState.error,
                similarLoading: state.similarState.loading,
                similar: state.similarState.similar,
            }}
        >
            {children}
        </filmsContext.Provider>
    );
};

export default FilmsContextProvider;

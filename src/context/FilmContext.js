import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import { BASE_API } from '../constants';
import {
    GET_FILMS_ERROR,
    GET_FILMS_LOADING,
    GET_FILMS_SUCCESS,
    SET_SEARCH_RESULTS,
} from './constants';

import {
    filmsError,
    filmsLoading,
    filmsSuccess,
    setSearchResults,
} from './FilmActions';

const filmsContext = React.createContext();

export const useFilms = () => useContext(filmsContext);

const INIT_STATE = {
    films: [],
    loading: false,
    error: null,
    page: 1,
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
        default:
            return state;
    }
};
const FilmsContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const fetchFilms = async () => {
        dispatch(filmsLoading());
        try {
            const { data } = await axios(`${BASE_API}`);
            // const { data } = await axios(`${BASE_API}/${window.location.search}`);
            // console.log(window.location.search);
            setTimeout(() => {
                dispatch(filmsSuccess(data));
            }, 1000);
        } catch (error) {
            console.log(error.message);
            dispatch(filmsError(error.message));
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
            }}
        >
            {children}
        </filmsContext.Provider>
    );
};

export default FilmsContext;

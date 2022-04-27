import {
    GET_REC_ERROR,
    GET_REC_LOADING,
    GET_REC_SUCCESS,
    GET_SIMILAR_ERROR,
    GET_SIMILAR_LOADING,
    GET_SIMILAR_SUCCESS,
} from '../constants';

export const recLoading = () => ({ type: GET_REC_LOADING });

export const recSuccess = (data) => ({
    type: GET_REC_SUCCESS,
    payload: data,
});

export const recError = (msg) => ({ type: GET_REC_ERROR, payload: msg });

export const similarLoading = () => ({ type: GET_SIMILAR_LOADING });

export const similarSuccess = (data) => ({
    type: GET_SIMILAR_SUCCESS,
    payload: data,
});

export const similarError = (msg) => ({
    type: GET_SIMILAR_ERROR,
    payload: msg,
});

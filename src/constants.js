export const API_KEY_V3 = 'api_key=8dd4b7ec293308a77b6ce6084a6bd0e6';
export const API_KEY_V4 =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGQ0YjdlYzI5MzMwOGE3N2I2Y2U2MDg0YTZiZDBlNiIsInN1YiI6IjYyNjUzOTgyZmJlMzZmMDBhMWRmODVkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MOc9_5d1_mHDZaKOLxqB4-2fhWygQC_m64ZJhSEm_qM';

export const BASE_API = `https://api.themoviedb.org/3/`;
export const POPULAR_API = `${BASE_API}movie/popular?${API_KEY_V3}&page=`;
export const SEARCH_API = `${BASE_API}search/multi?${API_KEY_V3}&query=`;
export const GENRES_API = `${BASE_API}genre/movie/list?${API_KEY_V3}&language=en-US`;
export const SIMILAR_API = `${BASE_API}movie/414906/similar?${API_KEY_V3}`;

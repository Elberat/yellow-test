import React, { useReducer } from 'react';
export const favoriteContext = React.createContext();

const INIT_STATE = {
    favorite: {},
    favoriteLength: 0,
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_FAVORITE':
            return {
                ...state,
                favorite: action.payload,
                favoriteLength: action.payload.films.length,
            };
        default:
            return state;
    }
};

const FavoriteContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    function getFavorite() {
        let favorite = JSON.parse(localStorage.getItem('favorite'));
        if (!favorite) {
            favorite = {
                films: [],
            };
            localStorage.setItem('favorite', JSON.stringify(favorite));
        }
        dispatch({
            type: 'GET_FAVORITE',
            payload: favorite,
        });
    }
    function addProductToFavorite(product) {
        let favorite = JSON.parse(localStorage.getItem('favorite'));
        if (!favorite) {
            favorite = {
                films: [],
            };
        }
        let newProduct = {
            item: product,
            // count: 1,
        };
        let isProductInFavorite = favorite.films.some(
            (item) => item.item.id === product.id
        );
        if (isProductInFavorite) {
            favorite.films = favorite.films.filter(
                (item) => item.item.id !== product.id
            );
        } else {
            favorite.films.push(newProduct);
        }
        localStorage.setItem('favorite', JSON.stringify(favorite));
        getFavorite();
    }
    function checkItemInFavorite(id) {
        let favorite = JSON.parse(localStorage.getItem('favorite'));
        if (!favorite) {
            favorite = {
                films: [],
            };
        }
        let isProductInFavorite = favorite.films.some(
            (item) => item.item.id === id
        );
        return isProductInFavorite;
    }
    function deleteFromFavorite(id) {
        let favorite = JSON.parse(localStorage.getItem('favorite'));
        if (!favorite) {
            favorite = {
                films: [],
            };
        }
        favorite.films = favorite.films.filter((item) => item.item.id !== id);
        localStorage.setItem('favorite', JSON.stringify(favorite));
        getFavorite();
    }
    return (
        <favoriteContext.Provider
            value={{
                favorite: state.favorite,
                favoriteLength: state.favoriteLength,
                getFavorite,
                addProductToFavorite,
                checkItemInFavorite,
                deleteFromFavorite,
            }}
        >
            {children}
        </favoriteContext.Provider>
    );
};
export default FavoriteContextProvider;

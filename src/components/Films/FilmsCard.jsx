import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Loader } from './FilmsList';
import { favoriteContext } from '../../context/FavoriteContext';

const CardWrapper = styled.div`
    padding: 15px 15px;
    margin: 10px;
    width: 300px;
    border: 2px solid black;
`;

const CardButton = styled.button`
    width: 100%;
    background-color: white;
    color: black;
    border: 2px solid #555555;
    padding: 5px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    &:hover {
        background-color: #555555;
        color: white;
    }
`;

export const FavButton = styled.button`
    width: 100%;
    background-color: #57ac40;
    color: #ffffff;
    border: 2px solid #57ac40;
    padding: 5px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    &:hover {
        background-color: #3d8928;
        color: white;
    }
`;

export const RemoveFavButton = styled.button`
    width: 100%;
    background-color: #ac2e2e;
    color: black;
    border: 2px solid #801b1b;
    padding: 5px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    &:hover {
        background-color: #831f1f;
        color: #000000;
    }
`;

const FilmCard = ({ film, genres }) => {
    const { addProductToFavorite, checkItemInFavorite } =
        useContext(favoriteContext);
    const [checkFavorite, setCheckFavorite] = useState(
        checkItemInFavorite(film.id)
    );

    const filmGenresId = film.genre_ids;

    if (!film || !filmGenresId) {
        return <Loader>Loading...</Loader>;
    }
    if (film && filmGenresId) {
        let filmGenresArr = genres.filter((genre) =>
            filmGenresId.includes(genre.id)
        );
        return (
            <CardWrapper>
                <h3>
                    {film.title
                        ? film.title.substring(0, 20)
                        : film.name.substring(0, 20)}
                    ...
                </h3>
                <div style={{ margin: '15px 0' }}>
                    <img
                        width={270}
                        height={405}
                        src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                        alt={film.title}
                    />
                </div>
                <p style={{ margin: '5px 0' }}>
                    <b>Overview:</b>{' '}
                    {film.overview ? film.overview.substring(0, 50) : ''}...
                </p>
                <p>
                    <b>Release:</b> {film.release_date}
                </p>
                <div>
                    <b>Genres:</b>
                    {filmGenresArr.map((item) => (
                        <span> {item.name} </span>
                    ))}
                </div>
                <div
                    onClick={() => {
                        addProductToFavorite(film);
                        setCheckFavorite(checkItemInFavorite(film.id));
                    }}
                >
                    {!checkFavorite ? (
                        <FavButton>Add to favorites</FavButton>
                    ) : (
                        <RemoveFavButton>Remove from favorites</RemoveFavButton>
                    )}
                </div>

                <Link to={`/${film.id}`}>
                    <CardButton>Read more</CardButton>
                </Link>
            </CardWrapper>
        );
    }
};

export default FilmCard;

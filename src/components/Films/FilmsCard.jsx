import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoStarOutline, IoStar } from 'react-icons/io5';
import { Loader } from './FilmsList';

const CardWrapper = styled.div`
    padding: 15px 15px;
    margin: 10px;
    width: 300px;
    border: 2px solid black;
`;

const CardButton = styled.button`
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

const FilmCard = ({ film, genres }) => {
    const [fav, setFav] = useState(true);
    console.log(film, genres);
    const filmGenresId = film.genre_ids;
    console.log(filmGenresId);
    let filmGenresArr = genres.filter((genre) =>
        filmGenresId.includes(genre.id)
    );
    console.log(filmGenresArr);

    if (!film) {
        return <Loader>Loading...</Loader>;
    }

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
                {/* {fav ? (
                    <IoStarOutline style={{ fontSize: '22px' }} />
                ) : (
                    <IoStar style={{ fontSize: '22px' }} />
                )} */}
            </div>
            <div>
                <b>Genres:</b>
                {filmGenresArr.map((item) => (
                    <span> {item.name} </span>
                ))}
            </div>
            <Link to={`${film.id}`}>
                <CardButton>Read more</CardButton>
            </Link>
        </CardWrapper>
    );
};

export default FilmCard;

import React, { useEffect } from 'react';
import FilmCard from '../Films/FilmsCard';
import { ListWrapper, Loader } from '../Films/FilmsList';

const RecSimList = ({ films, genres, title }) => {
    if (!films) return <Loader>Loading...</Loader>;
    console.log(films.results);
    return (
        <div>
            <h2>{title}</h2>
            <ListWrapper>
                {films.results.map((film) => (
                    <FilmCard key={film.id} film={film} genres={genres} />
                ))}
            </ListWrapper>
        </div>
    );
};

export default RecSimList;

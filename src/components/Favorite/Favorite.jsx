import React, { useContext, useEffect } from 'react';
import { Container } from '../../App';
import { favoriteContext } from '../../context/FavoriteContext';
import { useFilms } from '../../context/FilmContext';
import FilmCard from '../Films/FilmsCard';
import { Loader, ListWrapper } from '../Films/FilmsList';

const Favorite = () => {
    const { getFavorite, favorite, deleteFromFavorite } =
        useContext(favoriteContext);
    const { genres, fetchGenres } = useFilms();

    useEffect(() => {
        getFavorite();
        fetchGenres();
    }, []);
    console.log(favorite.films);

    if (!favorite.films) {
        return <h2>loading</h2>;
    }
    return (
        <Container>
            <h2>Favorite films</h2>
            <ListWrapper>
                {favorite.films.map((film) => (
                    <FilmCard
                        genres={genres}
                        key={film.item.id}
                        film={film.item}
                    />
                ))}
            </ListWrapper>
        </Container>
    );
};

export default Favorite;

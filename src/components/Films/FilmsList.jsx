import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../../App';
import { useFilms } from '../../context/FilmContext';
import FilmCard from './FilmsCard';

export const Loader = styled.h2`
    text-align: center;
    margin: 20% auto;
`;

export const ListWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
`;

const FilmsList = () => {
    const {
        fetchFilms,
        error,
        loading,
        films,
        fetchGenres,
        genres,
        genresError,
        genresLoading,
    } = useFilms();

    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchFilms(page);
        fetchGenres();
    }, []);

    useEffect(() => {
        if (page !== 1) {
            fetchFilms(page);
        }
    }, [page]);
    console.log(films);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    });

    const scrollHandler = (e) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
            50
        ) {
            setPage(page + 1);
        }
    };

    if (loading && genresLoading) {
        return <Loader>Loading...</Loader>;
    }

    if (error) {
        return <Loader>{error}</Loader>;
    }

    if (genresError) {
        return <Loader>{genresError}</Loader>;
    }

    if (films && genres) {
        return (
            <Container>
                <h2>Popular Films</h2>
                <ListWrapper>
                    {films.map((film) => (
                        <FilmCard
                            genres={genres}
                            key={film.id + Date.now}
                            film={film}
                        />
                    ))}
                </ListWrapper>
            </Container>
        );
    }
};

export default FilmsList;

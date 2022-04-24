import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../../App';
import { useFilms } from '../../context/FilmContext';
import FilmCard from './FilmsCard';

const Loader = styled.h2`
    text-align: center;
    margin: 30% auto;
`;

const FilmsList = () => {
    const { fetchFilms, error, loading, films } = useFilms();

    useEffect(() => {
        fetchFilms();
    }, []);
    console.log(films);

    if (loading) {
        return <Loader>Loading...</Loader>;
    }

    if (error) {
        <Loader>{error}</Loader>;
    }

    return (
        <Container>
            <h2>Popular Films</h2>
            {films.map((film) => (
                <FilmCard key={film.id} film={film} />
            ))}
        </Container>
    );
};

export default FilmsList;

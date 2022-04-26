import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../../App';
import { useFilms } from '../../context/FilmContext';
import FilmCard from './FilmsCard';

export const Loader = styled.h2`
    text-align: center;
    margin: 20% auto;
`;

const ListWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
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
        return <Loader>{error}</Loader>;
    }

    return (
        <Container>
            <h2>Popular Films</h2>
            <ListWrapper>
                {films.map((film) => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </ListWrapper>
        </Container>
    );
};

export default FilmsList;

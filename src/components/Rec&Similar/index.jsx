import React, { useEffect } from 'react';
import { Container } from '../../App';
import { useFilms } from '../../context/FilmContext';
import { Loader } from '../Films/FilmsList';
import { useParams } from 'react-router-dom';
import RecSimList from './Rec';

const RecAndSim = () => {
    const { id } = useParams();
    const {
        fetchRecs,
        rec,
        recError,
        recLoading,
        fetchSimilar,
        similar,
        similarError,
        similarLoading,
        genres,
        fetchGenres,
    } = useFilms();

    useEffect(() => {
        fetchRecs(id);
        fetchSimilar(id);
        fetchGenres();
    }, []);

    if (recError) {
        return <Loader>{recError}</Loader>;
    }
    if (similarError) {
        return <Loader>{similarError}</Loader>;
    }

    if (recLoading || similarLoading) {
        return <Loader>Loading...</Loader>;
    }

    return (
        <Container>
            <RecSimList films={rec} genres={genres} title='Recomendations' />
            <RecSimList films={similar} genres={genres} title='Similar' />
        </Container>
    );
};

export default RecAndSim;

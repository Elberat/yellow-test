import React, { useEffect } from 'react';
import { Container } from '../../App';
import { useParams } from 'react-router';
import { useFilms } from '../../context/FilmContext';
import { Loader } from '../Films/FilmsList';
const Details = () => {
    const { id } = useParams();
    const { oneFimlDetails, oneFilmError, OneFilmsLoading, fetchOneFilm } =
        useFilms();
    console.log(id);

    useEffect(() => {
        fetchOneFilm(id);
    }, []);
    console.log(oneFimlDetails);

    if (OneFilmsLoading) {
        return <Loader>Loading...</Loader>;
    }

    if (oneFilmError) {
        return <Loader>{oneFilmError}</Loader>;
    }

    if (oneFimlDetails) {
        return (
            <Container>
                <div style={{ width: '100%', display: 'flex' }}>
                    <div style={{ width: '500px' }}>
                        <img
                            width={450}
                            src={`https://image.tmdb.org/t/p/original${oneFimlDetails.poster_path}`}
                            alt='film poster'
                        />
                    </div>
                    <div style={{ padding: '0 0 0 20px' }}>
                        <h2>Title: {oneFimlDetails.original_title}</h2>
                        <h4>Tagline: {oneFimlDetails.tagline}</h4>
                        <h4>Budget: {oneFimlDetails.budget}$</h4>
                        <h4>Status: {oneFimlDetails.status}</h4>
                        <h4>Overview: {oneFimlDetails.overview}</h4>
                        <h4>
                            Original language:
                            {oneFimlDetails.original_language}
                        </h4>
                        <h4>Release: {oneFimlDetails.release_date}</h4>
                        <h4>Runtime: {oneFimlDetails.runtime} min</h4>
                        <h4>Vote count: {oneFimlDetails.vote_count}</h4>
                        <h4>Vote avarage: {oneFimlDetails.vote_average}</h4>
                        <div>
                            <h4>Genres:</h4>
                            {oneFimlDetails.genres.map((genre) => (
                                <div key={genre.id}>{genre.name}</div>
                            ))}
                        </div>
                        <div>
                            <h3>Companies</h3>
                            {oneFimlDetails.production_companies.map(
                                (company) => (
                                    <p>{company.name}</p>
                                )
                            )}
                            company
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
};

export default Details;

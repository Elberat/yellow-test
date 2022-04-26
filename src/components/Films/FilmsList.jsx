import React, { useEffect, useLayoutEffect, useState } from 'react';
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
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchFilms(page);
    }, [page]);
    console.log(films, page);

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
            100
        ) {
            setPage(page + 1);
        }
    };

    if (loading) {
        return <Loader>Loading...</Loader>;
    }

    if (error) {
        return <Loader>{error}</Loader>;
    }

    if (films) {
        return (
            <Container>
                <h2>Popular Films</h2>
                <ListWrapper>
                    {films.map((film) => (
                        <FilmCard key={film.id} film={film} />
                    ))}
                </ListWrapper>

                {/* <div style={{ width: '100px' }}>
                    <div>prev</div>
                    <div onClick={() => setPage(page + 1)}>next</div>
                </div> */}
            </Container>
        );
    }
};

export default FilmsList;

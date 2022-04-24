import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    width: 300px;
    height: 400px;
`;

const FilmCard = ({ film }) => {
    console.log(film);
    return (
        <CardWrapper>
            <h4>Title: {film.title}</h4>
            <h6>Overview: {film.overview}</h6>
        </CardWrapper>
    );
};

export default FilmCard;

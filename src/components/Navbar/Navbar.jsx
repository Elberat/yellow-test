import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../../App';
import { useFilms } from '../../context/FilmContext';

const NavbarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`;

const SeatchInputWrapper = styled.div`
    width: 300px;
    display: flex;
    height: 36px;
`;
const SearchInput = styled.input`
    width: 100%;
    height: 36px;
    border: 3px solid #000000;
    border-right: none;
    padding: 5px;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: #273741;
    &:focus {
        color: #273741;
    }
`;

const SearchInputButton = styled.button`
    width: 40px;
    height: 36px;
    border: 1px solid #000000;
    background: #000000;
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 20px;
`;

const Navbar = () => {
    const { fetchSearchFilms } = useFilms();
    const [search, setSearch] = useState('');
    console.log(search);

    const handleSearch = () => {
        fetchSearchFilms(search);
    };

    return (
        <>
            <hr />
            <Container>
                <NavbarWrapper>
                    <Link to={`/`}>
                        <h2>The Movie Database API</h2>
                    </Link>
                    <Link to={`/fav`}>
                        <h2>Favorites</h2>
                    </Link>

                    <SeatchInputWrapper>
                        <SearchInput
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search'
                        />
                        <SearchInputButton onClick={() => handleSearch()}>
                            s
                        </SearchInputButton>
                    </SeatchInputWrapper>
                </NavbarWrapper>
            </Container>
            <hr />
        </>
    );
};

export default Navbar;

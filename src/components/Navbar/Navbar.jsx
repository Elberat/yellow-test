import React from 'react';
import styled from 'styled-components';
import { Container } from '../../App';

const NavbarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SeatchInputWrapper = styled.div`
    width: 30%;
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
    return (
        <>
            <hr />
            <Container>
                <NavbarWrapper>
                    <h2>The Movie Database API</h2>
                    <SeatchInputWrapper>
                        <SearchInput placeholder='Search' />
                        <SearchInputButton />
                    </SeatchInputWrapper>
                </NavbarWrapper>
            </Container>
            <hr />
        </>
    );
};

export default Navbar;

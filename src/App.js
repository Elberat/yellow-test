import styled from 'styled-components';
import Navbar from './components/Navbar/Navbar';
import Routing from './Routes';
import { BrowserRouter } from 'react-router-dom';
import FavoriteContextProvider from './context/FavoriteContext';
import FilmsContextProvider from './context/FilmContext';

export const Container = styled.div`
    width: 80vw;
    margin: 0 auto;
    padding: 20px 0;
`;

function App() {
    return (
        <>
            <FilmsContextProvider>
                <FavoriteContextProvider>
                    <BrowserRouter>
                        <Navbar />
                        <Routing />
                    </BrowserRouter>
                </FavoriteContextProvider>
            </FilmsContextProvider>
        </>
    );
}

export default App;

import styled from 'styled-components';
import FilmsContext from './context/FilmContext';
import FilmsList from './components/Films/FilmsList';
import Navbar from './components/Navbar/Navbar';
import Routing from './Routes';
import { BrowserRouter } from 'react-router-dom';

export const Container = styled.div`
    width: 80vw;
    margin: 0 auto;
    padding: 20px 0;
`;

function App() {
    return (
        <>
            <FilmsContext>
                <BrowserRouter>
                    <Navbar />
                    <Routing />
                </BrowserRouter>
            </FilmsContext>
        </>
    );
}

export default App;

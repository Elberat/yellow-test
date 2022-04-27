import { Routes, Route } from 'react-router-dom';
import Details from './components/Details/Details';
import Favorite from './components/Favorite/Favorite';
import FilmsList from './components/Films/FilmsList';

const Routing = () => {
    let PUBLIC_ROUTES = [
        {
            link: '/',
            element: <FilmsList />,
            id: 1,
        },
        {
            link: '/:id',
            element: <Details />,
            id: 2,
        },
        {
            link: '/fav',
            element: <Favorite />,
            id: 3,
        },
        {
            link: '/fav/:id',
            element: <Details />,
            id: 4,
        },
    ];

    return (
        <Routes>
            {PUBLIC_ROUTES.map((route) => (
                <Route
                    key={route.id}
                    path={route.link}
                    element={route.element}
                />
            ))}
        </Routes>
    );
};

export default Routing;

import { Routes, Route, Navigate } from 'react-router-dom';
import Details from './components/Details/Details';
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
    ];

    return (
        <Routes>
            {PUBLIC_ROUTES.map((item) => (
                <Route key={item.id} path={item.link} element={item.element} />
            ))}
        </Routes>
    );
};

export default Routing;

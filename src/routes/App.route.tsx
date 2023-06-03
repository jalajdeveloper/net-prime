import { createBrowserRouter } from 'react-router-dom';
import Movies from '../pages/Movies';
import MovieDetail from '../pages/MovieDetailPage';
import MoviesWatchList from '../pages/watchlist/MoviesWatchList';

export default createBrowserRouter([
  {
    path: '/',
    element: <Movies />,
  },
  {
    path: 'movie-details/:movieId',
    element: <MovieDetail />,
  },
  {
    path: 'watch-list',
    element: <MoviesWatchList />,
  },
]);

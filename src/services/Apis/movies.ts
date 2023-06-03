import { backEndInstace } from '..';
import { watchListEndPoints } from '../../types';
import { watchListRes } from '../../types';

const endPoints: watchListEndPoints = {
  addToWatchList: 'movies/add-to-watch-list',
  checkWatchList: 'movies/check-watch-list',
  getMoviesPage: 'tmdb/movies/get-movies',
  movieDetails: 'tmdb/movies/get-movie-details',
  watchListMovies: "/movies/get-watch-list-movies"
};



export const getMovies = (order:string | undefined ,pageNum = 1,) => {
  if(order){
    return backEndInstace.get(`${endPoints.getMoviesPage}/${pageNum}?rating=${order}`); 
  }
  return backEndInstace.get(`${endPoints.getMoviesPage}/${pageNum}`);
};

export const getMovieDetail = (movieId: number | undefined | string) => {
  return backEndInstace.get(`${endPoints.movieDetails}/${movieId}`);
};

export const addToWatchList = (movieId: number | unknown = 619329) => {
  return backEndInstace.post<watchListRes>(endPoints.addToWatchList, {
    movieId,
  });
};

export const checkWatchList = (movieId: unknown | number = 988165) => {
  return backEndInstace.get<watchListRes>(
    `${endPoints.checkWatchList}/${movieId}`
  );
};

export const getWatchListMovies = () =>{
  return backEndInstace.get(endPoints.watchListMovies)
}
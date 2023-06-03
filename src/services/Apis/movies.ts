import { backEndInstace } from "..";
import { watchListEndPoints } from "../../types";
import { watchListRes } from "../../types";

const endPoints: watchListEndPoints = {
  addToWatchList: "movies/add-to-watch-list",
  checkWatchList: "movies/check-watch-list",
  getMoviesPage: "tmdb/movies/get-movies",
  movieDetails: "tmdb/movies/get-movie-details"
};



export const getMovies = (pageNum = 1) => {
  return backEndInstace.get(`${endPoints.getMoviesPage}/${pageNum}`);
};

export const getMovieDetail = (movieId: number | undefined | string ) => {
  return backEndInstace.get(`${endPoints.movieDetails}/${movieId}`)
};

export const addToWatchList = (movieId = 619329) => {
  return backEndInstace.post<watchListRes>(endPoints.addToWatchList, { movieId });
};

export const checkWatchList = (movieId = 988165) =>{
  return backEndInstace.get<watchListRes>(`${endPoints.checkWatchList}/${movieId}`);
}

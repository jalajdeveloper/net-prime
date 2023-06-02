import { instance, movieDetailinstance, backEndInstace } from "..";
import { watchListEndPoints } from "../../types";
import { watchListRes } from "../../types";

const endPoints: watchListEndPoints = {
  addToWatchList: "add-to-watch-list",
  checkWatchList: "check-watch-list",
};

export const getMovies = (pageNum = 1) => {
  return instance.get(`&page=${pageNum}`);
};

export const getMovieDetail = (movieId: number | undefined | string ) => {
  return movieDetailinstance.get(
    `/${movieId}?api_key=${process.env.REACT_APP_TMDB_API}`
  );
};

export const addToWatchList = (movieId = 619329) => {
  return backEndInstace.post<watchListRes>(endPoints.addToWatchList, { movieId });
};

export const checkWatchList = (movieId = 988165) =>{
  return backEndInstace.get<watchListRes>(`${endPoints.checkWatchList}/${movieId}`);
}

import { instance , movieDetailinstance } from "..";
import axios from "axios";

//https://api.themoviedb.org/3/discover/movie?api_key=71f6d6491ccd8a70c189ecc6dc85548b&sort_by=popularity.desc&page=1
export const getMovies = (pageNum: number ) => {
  return instance.get(`&page=${pageNum}`)
};

export const getMovieDetail = (movieId: number | undefined | string | any) => {
    // 
    //return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API}`)
    return movieDetailinstance.get(`/${movieId}?api_key=${process.env.REACT_APP_TMDB_API}`)
}


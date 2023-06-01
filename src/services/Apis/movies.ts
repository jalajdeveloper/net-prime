import { instance , movieDetailinstance } from "..";


export const getMovies = (pageNum: number ) => {
  return instance.get(`&page=${pageNum}`)
};

export const getMovieDetail = (movieId: number | undefined | string | any) => {
    return movieDetailinstance.get(`/${movieId}?api_key=${process.env.REACT_APP_TMDB_API}`)
}


import { instance } from "..";


//https://api.themoviedb.org/3/discover/movie?api_key=71f6d6491ccd8a70c189ecc6dc85548b&sort_by=popularity.desc&page=1
export const getMovies = (pageNum: number ) => {
  return instance.get(`&page=${pageNum}`)
};




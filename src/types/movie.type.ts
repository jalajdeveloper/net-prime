export interface movieType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  moviekey: string;
}

export interface watchListType {
    id: number | undefined;
    original_title: string | undefined;
    overview: string | undefined;
    poster_path: string | undefined;
    release_date: string | undefined;
    vote_average: number | undefined;
  
  }

export interface orderObjType {
    as: string,
    de: string,
    all: string | undefined
  }

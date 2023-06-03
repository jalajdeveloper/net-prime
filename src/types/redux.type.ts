import { movieType } from './movie.type';

export interface moviesState {
  movies: movieType[];
  movieLanguage: string;
  filterType: string | undefined;
  yearOfRelease: string;
  order: string;
}

export interface filterPayload {
  movieLanguage?: string;
  filterType?: string;
  yearOfRelease?: string;
}

export interface orderPayload {
  order: string;
}

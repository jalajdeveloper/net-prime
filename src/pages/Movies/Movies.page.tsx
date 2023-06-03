
import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { AxiosResponse , AxiosError} from "axios";
import { getMovies } from "../../services/Apis/movies";
import { useEffect, useState, useMemo } from "react";
import LoadingAndError from "../../components/LoadingAndError";
import MovieTiles from "../../components/MovieTiles";
import { movieType , orderObjType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { addMovies } from "../../redux/slices/movies.slice";
import FilterBoxs from "../../components/FilterBoxs";
import { loadingAndState } from "../../types";

const Movies = () => {
  const {
    movies: allMovies,
    filterType,
    movieLanguage,
    yearOfRelease,
    order
  } = useSelector((state: RootState) => state.movies);
  const dispatch: AppDispatch = useDispatch();
  const [previousOrder , setPreviousOrder] = useState<string | undefined>()
  const [page, setPage] = useState(1);
  const [state, setState] = useState<loadingAndState>({
    loading: false,
    error: false,
  });
const orderObj: orderObjType = {
  as: "asc",
  de: "desc",
  all: undefined
}

  useEffect(() => {
    window.onscroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setPage((p) => p + 1);
      }
    };
  }, []);

  useEffect(() => {
    
    const selectedOrder = orderObj[(order as keyof orderObjType)] ;
   if(previousOrder !== selectedOrder) {
    setPreviousOrder(selectedOrder);
    dispatch(addMovies([]));
   }
    setState((prv: loadingAndState) => ({ ...prv, loading: true }));
    getMovies(selectedOrder ,page)
      .then((res: AxiosResponse) => {
        dispatch(addMovies(res.data.results));
      })
      .catch((err: AxiosError) => {
        setState((prv: loadingAndState) => ({ ...prv, error: !!err }));
      })
      .finally(() => {
        setState((prv: loadingAndState) => ({ ...prv, loading: false }));
      });
  }, [page , order]);

  const movies: movieType[] = useMemo(() => {
    const filterMovies: movieType[] = [];
    if (filterType === 'language') {
      if (movieLanguage === 'all') {
        return allMovies;
      }
      for (let i = 0; i < allMovies.length; i++) {
        const movie: movieType = allMovies[i];
        if (movie.original_language === movieLanguage) {
          filterMovies.push(movie);
        }
      }

      return filterMovies;
    }

    if (filterType === 'year_of_release') {
      for (let i = 0; i < allMovies.length; i++) {
        const movie: movieType = allMovies[i];
        if (yearOfRelease === 'all_years') {
          return allMovies;
        }
        if (
          (movie.release_date || '0000-00-00').split('-')[0] === yearOfRelease
        ) {
          filterMovies.push(movie);
        }
      }
      return filterMovies;
    }

    return allMovies;
  }, [page, filterType, yearOfRelease, movieLanguage, allMovies]);

  const loadingInfinty = () => {
    if (page > 1 && state.loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size="3rem" />
        </Box>
      );
    }

    return <div />;
  };

  return (
    <LoadingAndError error={state.error} loading={state.loading} page={page}>
      <FilterBoxs />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1%',
          paddingLeft: '2%',
          paddingRight: '2%',
        }}
      >
        {movies.map((data: movieType, index: number) => (
          <MovieTiles
            {...data}
            moviekey={data.id + data.title}
            key={data.id + data.title + index}
          />
        ))}
      </Box>
      {loadingInfinty()}
    </LoadingAndError>
  );
};

export default Movies;

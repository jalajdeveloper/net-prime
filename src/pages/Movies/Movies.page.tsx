import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { AxiosResponse, AxiosError } from 'axios';
import { getMovies } from '../../services/Apis/movies';
import { useEffect, useState, useMemo, useRef } from 'react';
import LoadingAndError from '../../components/LoadingAndError';
import MovieTiles from '../../components/MovieTiles';
import { movieType, orderObjType } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { addMovies } from '../../redux/slices/movies.slice';
import FilterBoxs from '../../components/FilterBoxs';
import { loadingAndState } from '../../types';
import { useInView } from 'react-intersection-observer';

const Movies = () => {
  const {
    movies: allMovies,
    filterType,
    movieLanguage,
    yearOfRelease,
    order,
  } = useSelector((state: RootState) => state.movies);
  const dispatch: AppDispatch = useDispatch();
  const observerTarget = useRef(null);
  const { ref, inView } = useInView();
  const [previousOrder, setPreviousOrder] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [state, setState] = useState<loadingAndState>({
    loading: false,
    error: false,
  });
  const orderObj: orderObjType = {
    as: 'asc',
    de: 'desc',
    all: undefined,
  };

  useEffect(() => {
    if (inView) {
      setPage((p) => p + 1);
    }
  }, [inView]);

  useEffect(() => {
    const selectedOrder = orderObj[order as keyof orderObjType];
    if (previousOrder !== selectedOrder) {
      setPreviousOrder(selectedOrder);
      dispatch(addMovies([]));
    }
    setState((prv: loadingAndState) => ({ ...prv, loading: true }));
    getMovies(selectedOrder, page)
      .then((res: AxiosResponse) => {
        dispatch(addMovies(res.data.results));
      })
      .catch((err: AxiosError) => {
        setState((prv: loadingAndState) => ({ ...prv, error: !!err }));
      })
      .finally(() => {
        setState((prv: loadingAndState) => ({ ...prv, loading: false }));
      });
  }, [page, order]);

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
  }, [page, filterType, yearOfRelease, movieLanguage, allMovies, order]);

  useEffect(() => {
    const selectedOrder = orderObj[order as keyof orderObjType];
    if (previousOrder !== selectedOrder) {
      setPage(1)
    }
  },[order])

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
          <MovieTiles {...data} moviekey={`${index}`} key={`${index}`} />
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          placeContent: 'center',
          height: '200px',
          border: '2px solid #fff',
        }}
        ref={ref}
      >
        <CircularProgress
          size="3rem"
          ref={observerTarget}
          sx={{
            marginTop: '60px',
            display: `${page % 2 === 0 ? 'flex' : 'block'}`,
          }}
        />
      </Box>
    </LoadingAndError>
  );
};

export default Movies;

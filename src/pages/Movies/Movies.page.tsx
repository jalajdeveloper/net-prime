import {
  Box,
  CircularProgress,
} from "@mui/material";
import { AxiosResponse, AxiosError } from "axios";
import { getMovies } from "../../services/Apis/movies";
import { useEffect, useState } from "react";
import LoadingAndError from "../../components/LoadingAndError";
import MovieTiles from "../../components/MovieTiles";
import { movieType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { addMovies } from "../../redux/slices/movies.slice";
import FilterBoxs from "../../components/FilterBoxs";

const Movies = () => {
  const { movies } = useSelector((state: RootState) => state.movies);
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [state, setState] = useState<any>({
    loading: false,
    error: false,
  });


  useEffect(() => {
    window.onscroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setPage((p) => p + 1);
      }
    };
  }, []);

  useEffect(() => {
    setState((prv: any) => ({ ...prv, loading: true }));
    getMovies(page)
      .then((res: AxiosResponse) => {
        dispatch(addMovies(res.data.results));
      })
      .catch((err: AxiosError) => {
        setState((prv: any) => ({ ...prv, error: true }));
      })
      .finally(() => {
        setState((prv: any) => ({ ...prv, loading: false }));
      });
  }, [page]);

  return (
    <LoadingAndError error={state.error} loading={state.loading} page={page}>
        <FilterBoxs/>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5vh" }}>
        {movies.map((data: movieType, index: number) => (
          <MovieTiles
            {...data}
            moviekey={data.id + data.title}
            key={data.id + data.title + index}
          />
        ))}
      </Box>
      {page > 1 && state.loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size="6rem" />
        </Box>
      )}
    </LoadingAndError>
  );
};

export default Movies;

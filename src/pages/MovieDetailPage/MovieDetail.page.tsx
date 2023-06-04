import React from 'react';
import { useEffect, useState } from 'react';
import { getMovieDetail } from '../../services/Apis/movies';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { loadingAndState } from '../../types';
import { movieType, watchListType } from '../../types';
import { AxiosResponse } from 'axios';
import { CardMedia, Typography, Button } from '@mui/material';
import LoadingAndError from '../../components/LoadingAndError';
import { addToWatchList, checkWatchList } from '../../services/Apis/movies';


const MovieDetail = () => {
  const { movieId } = useParams();
  const [state, setState] = useState<loadingAndState>({
    loading: false,
    error: false,
  });
  const [isInWatchList, setIsInWatchList] = useState<boolean>(false);
  const [movie, setMovie] = useState<movieType>();
  const [errMessage,setErrorMessage] = useState<string | undefined>()
  useEffect(() => {
    setState((prv: loadingAndState) => ({ ...prv, loading: true }));
    getMovieDetail(movieId)
      .then((res: AxiosResponse) => {
        setMovie(res.data.result);
      })
      .catch(() => {
        setState((prv: loadingAndState) => ({ ...prv, error: true }));
      })
      .finally(() => {
        setState((prv: loadingAndState) => ({ ...prv, loading: false }));
      });
  }, []);
  
  useEffect(() => {
    setState((prv: loadingAndState) => ({ ...prv, loading: true }));
    checkWatchList(movieId)
      .then((res: AxiosResponse) =>
        setIsInWatchList(res?.data.movieExist as boolean)
      )
      .catch(() => {
        setState((prv: loadingAndState) => ({ ...prv, error: true }));
      })
      .finally(() => {
        setState((prv: loadingAndState) => ({ ...prv, loading: false }));
      });
  }, []);

  const addMovieToWatchList = () => {
    const addToWatch: watchListType = {
      id: movie?.id,
      vote_average: movie?.vote_average,
      release_date: movie?.release_date,
      original_title: movie?.original_title,
      overview: movie?.overview,
      poster_path: movie?.poster_path,
  }
    setIsInWatchList(true);
    addToWatchList(addToWatch).then((res: AxiosResponse) => {
      setIsInWatchList(res?.data.movieExist as boolean);
    }).catch((err) => {
    setErrorMessage(err.response.data.msg)
    });
  };

  return (
    <LoadingAndError error={state.error} loading={state.loading} page={0}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2%',
          paddingLeft: '5%',
          paddingRight: '10%',
          paddingTop: '20px',
        }}
        data-testid="moviesDetailsBox"
      >
        <div role="mediaCard">
          <CardMedia
            sx={{ height: 750, width: 650 }}
            image={'https://image.tmdb.org/t/p/original/' + movie?.poster_path}
            title={movie?.original_title}
          />
        </div>
        <div style={{ width: '50%' }}>
          <Typography
            variant="h3"
            color="text.secondary"
            data-testid="test-title"
          >
            {movie?.original_title}
          </Typography>

          {isInWatchList ? (
            <Button size="small" data-testid="test-watched-button">
              <Typography variant="h3">Watched</Typography>
            </Button>
          ) : (
            <Button
              size="large"
              onClick={() => addMovieToWatchList()}
              data-testid="test-watched-button"
            >
              <Typography variant="h5">Add In Watched</Typography>
            </Button>
          )}

          <Typography
            variant="h4"
            color="text.secondary"
            data-testid="test-rating"
          >
            Rating: {movie?.vote_average}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            Language: {movie?.original_language}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            Release Date: {movie?.release_date}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            Popularity: {movie?.popularity}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            Vote Count: {movie?.vote_count}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {movie?.overview}
          </Typography>
            
        </div>
      </Box>
    </LoadingAndError>
  );
};
// /popularity
export default MovieDetail;

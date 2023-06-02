import { useEffect, useState } from "react";
import { getMovieDetail } from "../../services/Apis/movies";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { loadingAndState } from "../../types";
import { movieType } from "../../types";
import { AxiosError, AxiosResponse } from "axios";
import { CardMedia, Typography } from "@mui/material";
import LoadingAndError from "../../components/LoadingAndError";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [state, setState] = useState<loadingAndState>({
    loading: false,
    error: false,
  });

  const [movie, setMovie] = useState<movieType>();
  useEffect(() => {
    setState((prv: loadingAndState) => ({ ...prv, loading: true }));
    getMovieDetail(movieId)
      .then((res: AxiosResponse) => setMovie(res.data))
      .catch((err: AxiosError) => {
        setState((prv: loadingAndState) => ({ ...prv, error: true }));
      })
      .finally(() => {
        setState((prv: loadingAndState) => ({ ...prv, loading: false }));
      });
  }, []);

  return (
<LoadingAndError error={state.error} loading={state.loading} page={0}>
      <Box sx={{ display: "flex",flexWrap: "wrap", gap: "2%" , paddingLeft:'5%',paddingRight:'10%', paddingTop:'20px' }} data-testid="moviesDetailsBox">
        <div role='mediaCard'>
          <CardMedia
            sx={{ height: 750, width: 650 }}
            image={"https://image.tmdb.org/t/p/original/" + movie?.poster_path}
            title={movie?.original_title}
            
          />
        </div>
        <div style={{width: "50%"}}>
        <Typography variant="h3" color="text.secondary" data-testid="test-title">
            {movie?.original_title}
          </Typography>
          <Typography variant="h4" color="text.secondary" data-testid="test-rating">
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
            Popularity: {movie?.popularity}
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

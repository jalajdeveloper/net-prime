import { movieType } from "../../types";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { addToWatchList , checkWatchList } from "../../services/Apis/movies";
import { AxiosError , AxiosResponse } from "axios";
import { loadingAndState } from "../../types";
import { useState , useEffect } from "react";
import LoadingAndError from "../LoadingAndError";



const MovieTiles = (props: movieType) => {
  const {
    poster_path,
    original_title,
    moviekey,
    overview,
    vote_average,
    id,
    release_date,
  } = props;
  const [isInWatchList, setIsInWatchList] = useState<boolean>(false);
  const [state, setState] = useState<loadingAndState>({
    loading: false,
    error: false,
  });

  const addMovieToWatchList = (id: number) => {
    setIsInWatchList(true);
    addToWatchList(id)
      .then((res: AxiosResponse) => {
       setIsInWatchList((res?.data.movieExist) as boolean);
      })
      .catch((err: AxiosError) => {});
  };

  useEffect(() => {
    setState((prv: loadingAndState) => ({ ...prv, loading: true }));
    checkWatchList(id)
      .then((res: AxiosResponse) => setIsInWatchList((res?.data.movieExist) as boolean))
      .catch((err: AxiosError) => {
        setState((prv: loadingAndState) => ({ ...prv, error: true }));
      })
      .finally(() => {
        setState((prv: loadingAndState) => ({ ...prv, loading: false }));
      });
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }} key={moviekey}>
      <CardMedia
        sx={{ height: 540, width: 400 }}
        image={"https://image.tmdb.org/t/p/original/" + poster_path}
        title={original_title}
      />
      <CardContent sx={{ maxWidth: 345 }}>
        <Typography gutterBottom variant="h5" component="div">
          {original_title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Rating {vote_average}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Release Date {release_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {overview}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingAndError loading={state.loading} error={state.error} page={0}>
        {isInWatchList ? (
          <Button size="small">Watched</Button>
        ) : (
          <Button size="small" onClick={() => addMovieToWatchList(id)}>
            Add In Watched
          </Button>
        )}
        </LoadingAndError>
        <Link to={`movie-details/${id}`}>
          <Button size="small">See More</Button>
        </Link>

      </CardActions>
    </Card>
  );
};

export default MovieTiles;

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
import { styled } from '@mui/system';

const AutoWidthCard = styled(Card)(({ theme }) => ({
  flex: '1 1 auto',
  marginTop: "2%"
}));

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
  function sliceTextTo150Words(text:string) {
    text = text.trim();
    const words = text.split(' ');
    const slicedWords = words.slice(0, 150);
    const slicedText = slicedWords.join(' ');
    return slicedText;
  }
   const slicedText = sliceTextTo150Words(overview)

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
    <AutoWidthCard key={moviekey} sx={{position: "relative"}}>
      <CardMedia
        sx={{ height: 540, width: "100%" }}
        image={"https://image.tmdb.org/t/p/original/" + poster_path}
        title={original_title}
      />
      <CardContent sx={{ maxWidth: 345 ,marginBottom:'30px'}}>
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
          {slicedText}
        </Typography>
      </CardContent>
      <CardActions sx={{position: "absolute !important" , bottom: "0 !important"}}>
        <LoadingAndError loading={state.loading} error={state.error} page={0} componentName={"tiles"}>
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
    </AutoWidthCard>
  );
};

export default MovieTiles;

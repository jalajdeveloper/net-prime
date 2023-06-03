import React from "react";
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
import { AxiosResponse } from "axios";
import { loadingAndState } from "../../types";
import { useState , useEffect } from "react";
import LoadingAndError from "../LoadingAndError";
import { styled } from '@mui/system';

const AutoWidthCard = styled(Card)(() => ({
  flex: '1 1 auto',
  marginTop: "2%"
}));

const MovieTiles = (props: movieType) => {
  const {
    poster_path: PosterPath,
    original_title: OriginalTitle, 
    moviekey: MovieKey,
    overview: Overview,
    vote_average: VoteAverage,
    id: Id,
    release_date:  releaseDate,
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
      
  };
  function sliceTextTo150Words(text:string) {
    text = text.trim();
    const words = text.split(' ');
    const slicedWords = words.slice(0, 150);
    const slicedText = slicedWords.join(' ');
    return slicedText;
  }
   const slicedText = sliceTextTo150Words(Overview)

  // useEffect(() => {
  //   setState((prv: loadingAndState) => ({ ...prv, loading: true }));
  //   checkWatchList(Id)
  //     .then((res: AxiosResponse) => setIsInWatchList((res?.data.movieExist) as boolean))
  //     .catch(() => {
  //       setState((prv: loadingAndState) => ({ ...prv, error: true }));
  //     })
  //     .finally(() => {
  //       setState((prv: loadingAndState) => ({ ...prv, loading: false }));
  //     });
  // }, []);

  return (
    <AutoWidthCard key={MovieKey} sx={{position: "relative"}} data-testid="test-movies-id">
      <CardMedia
        sx={{ height: 540, width: "100%" }}
        image={"https://image.tmdb.org/t/p/original/" + PosterPath}
        title={OriginalTitle}
      />
      <CardContent sx={{ maxWidth: 345 ,marginBottom:'30px'}} data-testid="test-movies-title">
        <Typography gutterBottom variant="h5" component="div">
          {OriginalTitle}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" data-testid="test-movies-rating">
          Rating {VoteAverage}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" data-testid="test-movies-release-data">
          Release Date {releaseDate}
        </Typography>
       <Typography variant="body2" color="text.secondary" data-testid="test-movies-title-overview">
          {slicedText}
        </Typography>
      </CardContent>
      <CardActions sx={{position: "absolute !important" , bottom: "0 !important"}}>
        <LoadingAndError loading={state.loading} error={state.error} page={0} componentName={"tiles"}>
        {isInWatchList ? (
          <Button size="small" data-testid="test-watched-button">Watched</Button>
        ) : (
          <Button size="small" onClick={() => addMovieToWatchList(Id)} data-testid="test-watched-button">
            Add In Watched
          </Button>
        )}
        </LoadingAndError>
        <Link to={`movie-details/${Id}`}>
          <Button size="small">See More</Button>
        </Link>

      </CardActions>
    </AutoWidthCard>
  );
};

export default MovieTiles;

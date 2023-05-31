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

const MovieTiles = (props: movieType) => {
  const { poster_path , original_title , moviekey, overview , vote_average , id } = props;
  
  return (
    <Card sx={{ maxWidth: 345 }} key={moviekey}>
      <CardMedia
        sx={{ height: 540 , width: 400}}
        image={"https://image.tmdb.org/t/p/original/" + poster_path}
        title={original_title}
      />
      <CardContent sx={{ maxWidth: 345 }}  >
        <Typography gutterBottom variant="h5" component="div">
          {original_title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
         Rating {vote_average}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Link to={`movie-details/${id}`}>
        <Button size="small">See More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieTiles;

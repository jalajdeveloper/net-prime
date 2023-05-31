import { movieType } from "../../types";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const MovieTiles = (props: movieType) => {
  const { poster_path , original_title , moviekey, overview } = props;
  console.log(props)
  return (
    <Card sx={{ maxWidth: 345 }} key={moviekey}>
      <CardMedia
        sx={{ height: 140 }}
        image={"https://image.tmdb.org/t/p/original/" + poster_path}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {original_title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default MovieTiles;

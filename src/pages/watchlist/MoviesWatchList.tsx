import { Box } from '@mui/material';
import { Typography } from '@mui/material';
// import MovieTiles from '../../components/MovieTiles';

const MoviesWatchList = () => {
  return (
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
      <Box>
        <Typography variant="h4">Your Watchlist</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1%',
          paddingLeft: '2%',
          paddingRight: '2%',
        }}
      >
        {/* <MovieTiles/> */}
      </Box>
    </Box>
  );
};
export default MoviesWatchList;

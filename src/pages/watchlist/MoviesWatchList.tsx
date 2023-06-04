import { Box } from '@mui/material';
import { useEffect , useState} from 'react';
import { Typography } from '@mui/material';
import { getWatchListMovies } from '../../services/Apis/movies';
import { AxiosResponse, AxiosError } from 'axios';
import MovieTiles from '../../components/MovieTiles';
import { loadingAndState } from '../../types';
import LoadingAndError from '../../components/LoadingAndError';
import { movieType } from '../../types';

const MoviesWatchList = () => {

  const [watchList , setWatchList] = useState<movieType[]>([])

  const [state, setState] = useState<loadingAndState>({
    loading: false,
    error: false,
  });

  useEffect(() => {
    setState((prv: loadingAndState) => ({ ...prv, loading: true }));
    getWatchListMovies()
      .then((res: AxiosResponse) => {
        console.log(res)
            setWatchList(res.data.results)
      } 
      )
      .catch((err: AxiosError) => {
        setState((prv: loadingAndState) => ({ ...prv, error: !!err }));
      })
      .finally(() => {
        setState((prv: loadingAndState) => ({ ...prv, loading: false }));
      });
  }, []);
  return (
    <LoadingAndError error={state.error} loading={state.loading} page={0}>
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
         {watchList.length ? 
        watchList.map((data: movieType, index: number) => (
          <MovieTiles
            {...data}
            moviekey={data.id + data.title}
            key={data.id + data.title + index}
          />
        )) :  <Typography variant="h4">Start Adding Movies In Your WatchList</Typography> 
        }
      </Box>
</LoadingAndError>
  );
}
export default MoviesWatchList;

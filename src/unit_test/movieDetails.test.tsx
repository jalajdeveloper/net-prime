import {render,screen, waitFor} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getMovieDetail } from '../services/Apis/movies';
import * as api from "../services/Apis/movies"
import MovieDetail from '../pages/MovieDetailPage/MovieDetail.page';


jest.mock('../services/Apis/movies')

const movieMock = {
  "adult": false,
  "backdrop_path": "/bxY7ve1LP8atCIuvr4jeeJMmU4w.jpg",
  "genre_ids": [
      35,
      18
  ],
  "id": 37165,
  "original_language": "en",
  "original_title": "The Truman Show",
  "overview": "Truman Burbank is the star of The Truman Show, a 24-hour-a-day reality TV show that broadcasts every aspect of his life without his knowledge. His entire life has been an unending soap opera for consumption by the rest of the world. And everyone he knows, including his wife and his best friend is really an actor, paid to be part of his life.",
  "popularity": 47.462,
  "poster_path": "/vuza0WqY239yBXOadKlGwJsZJFE.jpg",
  "release_date": "1998-06-04",
  "title": "The Truman Show",
  "video": false,
  "vote_average": 8.1,
  "vote_count": 16292
}
describe('MovieDetail component', () => {
  let getMovieDetailMock: jest.Mock;

  beforeEach(() => {
    getMovieDetailMock = getMovieDetail as jest.Mock;
    getMovieDetailMock.mockClear();
    (getMovieDetail as jest.Mock).mockResolvedValue({
      data: {
        original_title: 'Movie Title',
        vote_average: 7.5,
      },
    });
  });

  it('renders the vote_average text', async () => {
    render(<MovieDetail />);
    expect(await screen.findByText(/Rating: 7\.5/)).toBeInTheDocument();
  });

 
  it('renders loading state and fetches movie details', async () => {
   (api.getMovieDetail as jest.Mock).mockResolvedValue({
      data: { results: movieMock },
    });
     render(
      <MemoryRouter initialEntries={['/movies/37165']}>
        <Routes>
        <Route path="/movies/:movieId" Component={(MovieDetail)} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
        expect(screen.getByTestId('test-title'));
        expect(screen.getByTestId('test-rating'));
         })
     expect(screen.getByTestId('moviesDetailsBox')).toBeInTheDocument();
  });
})

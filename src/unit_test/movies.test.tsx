import { render, screen, fireEvent, waitFor , waitForElementToBeRemoved} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MovieTiles from '../components/MovieTiles/MovieTiles.view';
import { store } from '../redux/store';
import moviesMock from './__mocks__/movie.mocks.json';
import * as api from '../services/Apis/movies';
import '@testing-library/jest-dom/extend-expect';

const asendingMovies = ([...moviesMock] || []).sort((a, b) => {
  if (a.vote_average > b.vote_average) {
    return 1;
  } else {
    return -1;
  }
});

const decendingMovies = ([...moviesMock] || []).sort((a, b) => {
  if (a.vote_average > b.vote_average) {
    return -1;
  } else {
    return 1;
  }
});

jest.mock('../services/Apis/movies');
function sliceTextTo150Words(text: string) {
  text = text.trim();
  const words = text.split(' ');
  const slicedWords = words.slice(0, 150);
  const slicedText = slicedWords.join(' ');
  return slicedText;
}

describe('MovieComponet', () => {
  beforeEach(() => jest.clearAllMocks());

  test('render and display movie tiltes', async () => {
    (api.getMovies as jest.Mock).mockResolvedValue({
      data: { results: moviesMock },
    });


    const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;


    render(
      <BrowserRouter>
        <Provider store={store}>
    
        {moviesMock.map((data: any, index: number) => (
          <MovieTiles {...data} moviekey={`${index}`} key={`${index}`} />
        ))}

        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
   

      const items = screen.getAllByTestId('test-movies-id');
      const titles = screen.getAllByTestId('test-movies-title');
      const rating = screen.getAllByTestId('test-movies-rating');
      const releaseDate = screen.getAllByTestId('test-movies-release-data');
      const overView = screen.getAllByTestId('test-movies-title-overview');

      expect(items.length).toBe(moviesMock.length);

      moviesMock.forEach((movie, i) => {
        expect(titles[i]).toHaveTextContent(movie.original_title);
        expect(rating[i]).toHaveTextContent(`${movie.vote_average}`);
        expect(releaseDate[i]).toHaveTextContent(movie.release_date);
        expect(overView[i]).toHaveTextContent(
          sliceTextTo150Words(movie.overview)
        );
      });
      
 
    });
  });
});

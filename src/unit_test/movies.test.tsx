import { render, screen, fireEvent, waitFor , getByRole} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Movies from "../pages/Movies/Movies.page";
import { store } from "../redux/store";
import moviesMock from "./__mocks__/movie.mocks.json";
import * as api from "../services/Apis/movies";
import { movieType } from "../types";
import UserEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { LabelImportantSharp } from "@mui/icons-material";

const asendingMovies: any = ([...moviesMock] || []).sort((a: any, b: any) => {
  if (a["vote_average"] > b["vote_average"]) {
    return 1;
  } else {
    return -1;
  }
});

const decendingMovies: any = ([...moviesMock] || []).sort((a: any, b: any) => {
  if (a["vote_average"] > b["vote_average"]) {
    return -1;
  } else {
    return 1;
  }
});


jest.mock("../services/Apis/movies");
function sliceTextTo150Words(text: string) {
  text = text.trim();
  const words = text.split(" ");
  const slicedWords = words.slice(0, 150);
  const slicedText = slicedWords.join(" ");
  return slicedText;
}

describe("MovieComponet", () => {
  beforeEach(() => jest.clearAllMocks());

  test("render and display movie tiltes", async () => {
    (api.getMovies as jest.Mock).mockResolvedValue({
      data: { results: moviesMock },
    });

    (api.checkWatchList as jest.Mock).mockResolvedValue({
      data: { results: moviesMock },
    });

    (api.addToWatchList as jest.Mock).mockResolvedValue({
      data: { results: moviesMock },
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Movies />
        </Provider>
      </BrowserRouter>
    );
    await waitFor(() => {
      const items = screen.getAllByTestId("test-movies-id");
      const titles = screen.getAllByTestId("test-movies-title");
      const rating = screen.getAllByTestId("test-movies-rating");
      const releaseDate = screen.getAllByTestId("test-movies-release-data");
      const overView = screen.getAllByTestId("test-movies-title-overview");
      const watchList = screen.getAllByTestId("test-watched-button");
      const sortingByRating = screen.getByTestId("sorting-button-test");
      const languageSelect = screen.getByTestId("language-select-test");

      expect(items.length).toBe(moviesMock.length);

      moviesMock.forEach((movie, i) => {
        expect(titles[i]).toHaveTextContent(movie.original_title);
        expect(rating[i]).toHaveTextContent(`${movie.vote_average}`);
        expect(releaseDate[i]).toHaveTextContent(movie.release_date);
        expect(overView[i]).toHaveTextContent(
          sliceTextTo150Words(movie.overview)
        );
      });
      watchList.forEach((button: any) => {
        fireEvent.click(button);
        expect(button).toHaveTextContent("Watched");
      });
      fireEvent.click(sortingByRating);

      const asendingRating = screen.getAllByTestId("test-movies-rating");

      asendingMovies.forEach((movie: movieType, i: number) => {
        expect(asendingRating[i]).toHaveTextContent(`${movie.vote_average}`);
      });

      fireEvent.click(sortingByRating);
      const decendingRating = screen.getAllByTestId("test-movies-rating");
      decendingMovies.forEach((movie: movieType, i: number) => {
        expect(decendingRating[i]).toHaveTextContent(`${movie.vote_average}`);
      });
      fireEvent.click(languageSelect);
      
    });
  });
});



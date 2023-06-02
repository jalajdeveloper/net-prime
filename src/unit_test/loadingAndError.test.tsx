import { render, screen } from "@testing-library/react";
import LoadingAndError from "../components/LoadingAndError";
import FilterBoxs from "../components/FilterBoxs/FilterBoxs.view";
import MovieDetail from "../pages/MovieDetailPage/MovieDetail.page";
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Loading or error", () => {
  it("render", () => {
    render(
      <MovieDetail />
    );

  });

  test("renders the initial loader", () => {
    render(<LoadingAndError loading={true} page={0} />);
    expect(screen.getByRole("loader")).toBeInTheDocument();
  });
  test("childrenDiv", () => {
    render(<LoadingAndError loading={true} page={2}/>);
    expect(screen.getByRole("childrenDiv")).toBeInTheDocument();
  });
  test("renders the error", () => {   
    render(<LoadingAndError loading={false} error={true}/>);
    expect(screen.getByRole("errormessage")).toBeInTheDocument();
  });
  test("renders the movie list", () => {
    <LoadingAndError>
      <FilterBoxs />
    </LoadingAndError>
    render(<LoadingAndError loading={false} error={false}/>);
    expect(screen.getByRole("childrenlist")).toBeInTheDocument();
  });



});
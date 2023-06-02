import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Movies from "../pages/Movies/Movies.page";
import { store } from "../redux/store";
describe("Movies Page", () => {
  it("render", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
        <Movies/>
        </Provider>
      </BrowserRouter>
       
    );
  });
});

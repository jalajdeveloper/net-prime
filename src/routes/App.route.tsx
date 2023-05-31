import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
  import Movies from "../pages/Movies";


export default createBrowserRouter([
    {
      path: "/",
      element: <Movies/>
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);
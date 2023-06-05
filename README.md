## Available Scripts
In the project directory, you can run:
### `npm start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
### `npm run test`
This will run the test cases for the project.
### `npm run coverage`
This will Produce you the coverage report for the tst cases.
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Architectural decisions
Decieded to store the all movies in a array to cache so application dont fetch movies from db every time.

## Design assumptions made
Did not about how much languages and year so i added the myself.

## About App

In this application the api call is made with the help of axios. For the state manegment solution i used redux/toolkit.
. For Trigering the infinity scrolling i used a library called react-intersection-observer . Because vanilla js libary wasnt working properly with react because of the synthetic events . For UI library i used MUI.

## API ENDPOINTS

GET 
To Get The Movies
/api/v1/tmdb/movies/get-movies/:pageNumber


 GET
 To Get The Movie Deat
 Movie Details
 /api/v1/tmdb/movies/get-movie-details/:movieId

 POST
 Add To WatchList
/api/v1/tmdb/movies/movies/add-to-watch-list/:movieId

GET 
To Get Movies Details
/api/v1/tmdb/movies/get-movie-details

GET
To Check Watch List If Movie Exists
/api/v1/tmdb/movies/check-watch-list


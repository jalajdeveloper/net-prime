import axios from "axios";

export const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}?api_key=${process.env.REACT_APP_TMDB_API}&`
})

export const movieDetailinstance = axios.create({
    baseURL: `${process.env.REACT_APP_DETAIL_URL}`
})
import axios from "axios";
//?api_key=71f6d6491ccd8a70c189ecc6dc85548b&sort_by=popularity.desc&page=1
//?api_key
export const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}?api_key=${process.env.REACT_APP_TMDB_API}&`
})
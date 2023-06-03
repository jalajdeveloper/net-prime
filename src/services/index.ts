import axios from 'axios';

export const backEndInstace = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
});

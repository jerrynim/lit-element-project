import Axios, { AxiosError } from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err: AxiosError) => {
    return Promise.reject(err.response);
  }
);

export default axios;

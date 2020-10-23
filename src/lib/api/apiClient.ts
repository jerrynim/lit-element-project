import Axios, { AxiosError } from "axios";

const axios = Axios.create({
  baseURL: "https://api-happy-portfolio.openknowl.com/",
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

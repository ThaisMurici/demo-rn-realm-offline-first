import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://10.0.2.2:3000/',
});

apiService.interceptors.request.use(
  (config) => {
    console.tron.log(
      `Request ${config.method.toUpperCase()} [${config.url}]`,
      config.data,
    );
    return config;
  },
  (error) => Promise.reject(error),
);

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiService;

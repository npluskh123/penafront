import axio from 'axios';

const instance = axio.create({
  //baseURL: 'http://localhost:4444',
  //baseURL: process.env.PORT || 8080,
  baseURL: 'http://93.183.75.58:8080',
});

//вшивать авторизацию
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;

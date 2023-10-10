import axio from 'axios';

const instance = axio.create({
  //baseURL: 'http://localhost:4444',
  baseURL: process.env.PORT,
});

//вшивать авторизацию
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;

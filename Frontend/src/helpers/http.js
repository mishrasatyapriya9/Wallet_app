import axios from 'axios';
import {logout} from '../redux/reducers/authUser';
import {store} from '../redux/store';


const url = 'https://boowallet-private-server.vercel.app/';

const https = token => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  const inseptor = axios.create({
    headers,
    baseURL: url,
  });

  inseptor.interceptors.response.use(
    config => {
      // console.log(config);
      return config;
    },
    e => {
      if (e.response.status === 401) {
        store.dispatch(logout());
      }
      return Promise.reject(e);
    },
  );

  return inseptor;
};

export default https;

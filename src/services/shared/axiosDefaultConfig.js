import axios from 'axios';
import {BASE_URL} from './baseUrl';

const appAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': true,
    crossorigin: true,
  },
});

export default appAxios;

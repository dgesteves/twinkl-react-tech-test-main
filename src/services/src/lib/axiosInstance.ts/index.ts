import axios from 'axios';
import {
  BASE_URL,
  REQUEST_HEADERS,
  REQUEST_TIMEOUT,
} from '@twinkl-react-tech-test-main/constants';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: REQUEST_HEADERS,
});

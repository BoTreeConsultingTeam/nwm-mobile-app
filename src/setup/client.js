import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { getToken } from '../utility/methods/localStorage';
import { getAPIBaseURL, showToast } from '../utility/methods/other';
// import { getToken, showToast, getAPIBaseURL } from "../utility/index";
// import store from "./store";
// import { constants } from "../constants";
// const baseURL = '';
const baseURL = getAPIBaseURL();
// const baseURLWithAPI = `${baseURL}/api/v1/`;

const client = axios.create({
  baseURL: 'http://35.161.16.84:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const get = (url, body, headers = {}) =>
  client.get(url, { params: body, headers });

const post = (url, body, headers = {}) => client.post(url, body, { headers });

const put = (url, body, headers = {}) =>
  client.put(url, body, { headers, params: headers });

const patch = (url, body, headers = {}) => client.patch(url, body, { headers });

const del = (url, body, headers = {}, data) =>
  client.delete(url, { params: body, headers, data: data });

client.interceptors.request.use(async config => {
  const token = await getToken();
  config.headers.Authorization = token;

  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    NetInfo.fetch().then(state => {
      // state.isConnected && showToast(i18nInstance.t('messages.tryAgain'));
    });
    return Promise.reject(error);
  },
);

export { get, post, put, del, patch, baseURL };

export default client;

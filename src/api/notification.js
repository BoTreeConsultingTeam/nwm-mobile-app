import { get, post } from '../setup/client';
import { endpoints } from './endpoint';

export const addFirebaseTokenToBackend = body => {
  return post(`${endpoints.sendFCMTokenToBackend}`, body);
};

export const getNotificationList = body => {
  return get(`${endpoints.getNotificationList}`, body);
};

import { post } from '../setup/client';
import { endpoints } from './endpoint';

export const loginUser = body => {
  return post(endpoints.login, body);
};

export const forgotPassword = body => {
  return post(endpoints.forgotPassword, body);
};

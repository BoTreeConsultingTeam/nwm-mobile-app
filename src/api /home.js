import { get } from '../setup/client';
import { endpoints } from './endpoint';

export const getDashboardData = body => {
  return get(`${endpoints.dashboard}`, body);
};

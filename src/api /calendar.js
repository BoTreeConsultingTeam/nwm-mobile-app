import { get, post, put } from '../setup/client';
import { endpoints } from './endpoint';

export const createUnavibilityCalendar = body => {
  return post(`${endpoints.createCalendarUnavibility}`, body);
};

export const getUnavibilityCalendar = body => {
  return get(`${endpoints.getCalendarUnavibility}`, body);
};

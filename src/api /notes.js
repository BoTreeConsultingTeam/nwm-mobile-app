import { del, get, post } from '../setup/client';
import { endpoints } from './endpoint';

export const addProjectNote = body => {
  return post(endpoints.addProjectNote, body);
};

export const getProjectNotes = body => {
  return get(endpoints.getProjectNotes, body);
};

export const addInspectionNote = body => {
  return post(endpoints.addInspectionNote, body);
};

export const getInspectionNotes = body => {
  return get(endpoints.getInspectionNotes, body);
};

export const deleteProjectNote = body => {
  return del(endpoints.deleteProjectNote, body);
};

export const deleteInspectionNote = body => {
  return del(endpoints.deleteInspectionNote, body);
};

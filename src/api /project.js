import { get, post, put } from '../setup/client';
import { endpoints } from './endpoint';

export const getProjectDetailsByID = body => {
  return get(`${endpoints.getProjectDetailsByID}`, body);
};

export const getRequestProjectList = body => {
  return get(`${endpoints.projectRequestList}`, body);
};

export const projectStatusChange = body => {
  return put(endpoints.projectStatusChange, body);
};

export const acceptAllProject = body => {
  return put(endpoints.acceptAllProject, body);
};

export const projectReject = body => {
  return put(endpoints.projectReject, null, body);
};

export const getActiveProjectList = body => {
  return get(endpoints.activeProject, body);
};

export const submitProject = body => {
  return post(
    `${endpoints.submitProject}?projectId=${body.projectId}&userId=${body.userId}`,
  );
};

export const getDocList = body => {
  return get(endpoints.documentList, body);
};

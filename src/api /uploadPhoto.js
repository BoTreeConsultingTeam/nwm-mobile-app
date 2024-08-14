import { del, get, post, put } from '../setup/client';
import { endpoints } from './endpoint';

export const uploadNewPhoto = body =>
  post(
    `${endpoints.addNewPhoto}?projectId=${body.projectId}&userId=${body.userId}`,
    body.data,
    {
      'Content-Type': 'multipart/form-data',
    },
  );

export const getAllPhotos = body => get(endpoints.getAllPhotos, body);

export const deletePhoto = data =>
  del(
    `${endpoints.deletePhoto}?projectId=${data.projectId}&userId=${data.userId}`,
    null,
    null,
    data.body,
  );

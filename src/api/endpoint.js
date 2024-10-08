export const endpoints = {
  login: '/authentication/user/login',
  forgotPassword: '/authentication/forgot-password',
  getProjectDetailsByID: '/project/by-project-id',
  projectRequestList: '/project/projects',
  projectStatusChange: '/project/accept-single-project',
  projectReject: '/project/reject-project',
  activeProject: '/project/accepted-projects',
  createCalendarUnavibility: '/Calendar',
  getCalendarUnavibility: '/Calendar/user',
  dashboard: '/inspection/getDashboard',
  acceptAllProject: '/project/accept-all-projects',
  addProjectNote: '/inspection/add-update-projectnotes',
  getProjectNotes: '/inspection/get-project-all-notes',
  addInspectionNote: '/inspection/add-update-inspection-notes',
  getInspectionNotes: '/inspection/get-inspection-all-notes',
  deleteInspectionNote: '/inspection/delete-Inspection-Note',
  deleteProjectNote: '/inspection/delete-Project-Note',
  addNewPhoto: '/AwsS3/upload-images',
  getAllPhotos: '/inspection/all-imagepaths',
  deletePhoto: '/inspection/delete-images',
  submitProject: '/inspection',
  documentList: '/inspection/documents',
  recentProject: '/inspection/recents',
  sendFCMTokenToBackend: '/fcm-notification/save-device-token',
  getNotificationList: '/notification/notifications',
};

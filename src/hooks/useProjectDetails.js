import React, { useEffect, useState } from 'react';
import { useFetchAPIData } from './common';
import { getProjectDetailsByID, submitProject } from '../api /project';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

export const useProjectDetails = ({ projectId, navigation }) => {
  const [projectDetails, setProjectDetails] = useState({});
  const [projectDetailsGetBody, setProjectDetailsGetBody] = useState({});
  const [submitProjectBody, setSubmitProjectBody] = useState({});
  const userId = useSelector(state => state.login.user.id);
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setProjectDetailsGetBody({
      projectId: projectId,
      userId: userId,
    });
  }, [isFocused]);

  const handleModal = () => {
    setVisible(!visible);
  };

  const handleProjectSubmit = () => {
    handleModal();
    setSubmitProjectBody({
      projectId: projectId,
      userId: userId,
    });
  };

  const successCb = (data, type) => {
    switch (type) {
      case 'get':
        {
          setProjectDetails(data.data);
        }
        break;
      case 'submit':
        {
          setSubmitProjectBody({});
          navigation.navigate('activeProject');
        }
        break;
    }
  };

  const [{ isLoading }] = useFetchAPIData({
    accessPath: ['data'],
    apiCallCondition: Object.keys(projectDetailsGetBody).length,
    dependencyArray: [projectDetailsGetBody],
    successCb: data => successCb(data, 'get'),
    apiParams: projectDetailsGetBody,
    apiFunction: getProjectDetailsByID,
  });

  useFetchAPIData({
    accessPath: ['data'],
    apiCallCondition: Object.keys(submitProjectBody).length,
    dependencyArray: [submitProjectBody],
    successCb: data => successCb(data, 'submit'),
    apiParams: submitProjectBody,
    apiFunction: submitProject,
    failureCb: e => console.log(e),
  });

  return [
    {
      isLoading,
      projectDetails,
      visible,
    },
    { handleProjectSubmit, handleModal },
  ];
};

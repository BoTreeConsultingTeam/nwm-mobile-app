import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchAPIData } from './common';
import { getRecentProject } from '../api/project';

export const useRecent = () => {
  const [recentProjectList, setRecentProjectList] = useState();
  const [getRecentProjectBody, setRecentProjectBody] = useState({});
  const user = useSelector(state => state.login.user);

  useEffect(() => {
    setRecentProjectBody({
      userId: user.id,
    });
  }, []);

  const successCb = (data, type) => {
    switch (type) {
      case 'get': {
        setRecentProjectList(data.data);
        setRecentProjectBody({});
        break;
      }
    }
  };

  const failureCb = () => {
    setRecentProjectBody({});
  };

  const [{ isLoading }] = useFetchAPIData({
    accessPath: ['data'],
    apiParams: getRecentProjectBody,
    apiCallCondition: !!Object.keys(getRecentProjectBody).length,
    apiFunction: getRecentProject,
    dependencyArray: [getRecentProjectBody],
    successCb: data => {
      successCb(data, 'get');
    },
    failureCb: failureCb,
  });

  return [{ isLoading, recentProjectList }];
};

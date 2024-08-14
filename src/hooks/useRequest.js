import React, { useEffect, useState } from 'react';
import { useFetchAPIData } from './common';
import {
  acceptAllProject,
  getRequestProjectList,
  projectReject,
  projectStatusChange,
} from '../api /project';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

export const useProjectRequest = () => {
  const [projectList, setProjectList] = useState([]);
  const [getProjectBody, setProjectBody] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [projectStatusBody, setProjectStatusBody] = useState([]);
  const userId = useSelector(state => state.login.user.id);
  const [projectRejectBody, setProjectRejectBody] = useState({});
  const [acceptAllProjectBody, setAcceptAllProjectBody] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (userId && isFocused) {
      setProjectList([]);
      setProjectBody({
        userId: userId,
        page: 1,
        itemsPerPage: 10,
      });
    }
  }, [userId, isFocused]);

  const fetchNextPage = () => {
    if (!endReached && !isPaginationLoading) {
      setProjectBody({
        userId: userId,
        page: currentPage + 1,
        itemsPerPage: 10,
      });
      setCurrentPage(prev => prev + 1);
      setIsPaginationLoading(true);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setProjectList([]);
    setCurrentPage(1);
    setEndReached(false);
    setProjectBody({
      userId: userId,
      page: 1,
      itemsPerPage: 10,
    });
  };

  const successCb = (data, type) => {
    switch (type) {
      case 'get':
        // eslint-disable-next-line no-lone-blocks
        {
          setProjectList(prev => [...prev, ...data?.data]);
          setEndReached(currentPage >= data.pagination.totalPages);
          setIsPaginationLoading(false);
          setRefreshing(false);
          setProjectBody({});
        }
        break;
      case 'update':
        {
          setProjectStatusBody([]);
          handleRefresh();
        }
        break;
      case 'reject':
        {
          setProjectRejectBody({});
          handleRefresh();
        }
        break;
      case 'all':
        {
          setAcceptAllProjectBody(null);
          handleRefresh();
        }
        break;
    }
  };

  const handleProjectRequest = (item, type) => {
    switch (type) {
      case 'accept':
        {
          setProjectStatusBody([item.id]);
        }
        break;
      case 'reject': {
        setProjectRejectBody({
          projectId: item.id,
        });
      }
    }
  };
  const handleAcceptAllRequest = () => {
    setAcceptAllProjectBody(userId);
  };

  const [{ isLoading }] = useFetchAPIData({
    accessPath: ['data', 'pagination'],
    apiCallCondition: Object.keys(getProjectBody).length,
    apiParams: getProjectBody,
    dependencyArray: [getProjectBody],
    apiFunction: getRequestProjectList,
    successCb: data => successCb(data, 'get'),
  });

  useFetchAPIData({
    accessPath: ['data'],
    apiCallCondition: projectStatusBody.length,
    apiParams: projectStatusBody,
    dependencyArray: [projectStatusBody],
    apiFunction: projectStatusChange,
    successCb: data => successCb(data, 'update'),
    failureCb: e => {
      console.log(e);
    },
  });

  useFetchAPIData({
    accessPath: ['data'],
    apiCallCondition: acceptAllProjectBody,
    apiParams: acceptAllProjectBody,
    dependencyArray: [acceptAllProjectBody],
    apiFunction: acceptAllProject,
    successCb: data => successCb(data, 'all'),
    failureCb: e => {
      console.log(e);
    },
  });

  useFetchAPIData({
    accessPath: ['data'],
    apiCallCondition: Object.keys(projectRejectBody).length,
    apiParams: projectRejectBody,
    dependencyArray: [projectRejectBody],
    apiFunction: projectReject,
    successCb: data => successCb(data, 'reject'),
    failureCb: e => {
      console.log(e);
    },
  });

  return [
    {
      isLoading,
      projectList,
      endReached,
      isPaginationLoading,
      refreshing,
    },
    {
      fetchNextPage,
      handleRefresh,
      handleProjectRequest,
      handleAcceptAllRequest,
    },
  ];
};

import { useEffect, useState } from 'react';
import { useFetchAPIData } from './common';
import { getNotificationList } from '../api/notification';
import { useSelector } from 'react-redux';

export const useNotification = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [getNotificationBody, setGetNotificationBody] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector(state => state.login.token);
  const user = useSelector(state => state.login.user);

  useEffect(() => {
    setGetNotificationBody({
      UserId: user?.id,
      AuthToken: token.split(' ')[1],
    });
  }, []);

  const fetchNextPage = () => {
    if (!endReached && !isPaginationLoading) {
      setGetNotificationBody({
        UserId: user?.id,
        AuthToken: token.split(' ')[1],
        Page: currentPage + 1,
        ItemsPerPage: 10,
      });
      setCurrentPage(prev => prev + 1);
      setIsPaginationLoading(true);
    }
  };

  const successCb = (data, type) => {
    switch (type) {
      case 'get': {
        if (data.data.notifications.length > 0) {
          setNotificationList(prev => [...prev, ...data.data.notifications]);
        }
        setEndReached(notificationList.length >= data.data.totalRecords);
        setGetNotificationBody({});
        setIsPaginationLoading(false);
        setRefreshing(false);
        break;
      }
    }
  };

  const failureCb = () => {
    setGetNotificationBody({});
    setIsPaginationLoading(false);
    setRefreshing(false);
    setEndReached(true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setNotificationList([]);
    setCurrentPage(1);
    setEndReached(false);
    setGetNotificationBody({
      UserId: user?.id,
      AuthToken: token.split(' ')[1],
      Page: 1,
      ItemsPerPage: 10,
    });
  };

  const [{ isLoading }] = useFetchAPIData({
    apiFunction: getNotificationList,
    apiParams: getNotificationBody,
    apiCallCondition: Object.keys(getNotificationBody).length,
    accessPath: ['data'],
    defaultResponseValue: [],
    dependencyArray: [getNotificationBody],
    successCb: data => successCb(data, 'get'),
    failureCb: failureCb,
  });

  return [
    {
      notificationList,
      isLoading,
      isPaginationLoading,
      refreshing,
      endReached,
    },
    {
      fetchNextPage,
      handleRefresh,
    },
  ];
};

import React, { useEffect, useRef, useState } from 'react';
import { useFetchAPIData } from './common';
import {
  createUnavibilityCalendar,
  getUnavibilityCalendar,
} from '../api /calendar';
import { useSelector } from 'react-redux';

export const useCalendar = () => {
  const [calendarBody, setCalendarBody] = useState({});
  const [calendarList, setCalendarList] = useState([]);
  const [createUnavibilityCalendarDate, setCreateUnavibilityCalendarDate] =
    useState({});
  const user = useSelector(state => state.login.user);
  const formikRef = useRef(null);

  useEffect(() => {
    if (user.id) {
      setCalendarBody({
        userId: user.id,
      });
    }
  }, []);

  const successCb = (data, type) => {
    switch (type) {
      case 'get':
        {
          setCalendarList(data.data);
          setCalendarBody({});
        }
        break;
      case 'update': {
        setCreateUnavibilityCalendarDate({});
        formikRef.current?.resetForm();
        setCalendarBody({
          userId: user.id,
        });
        break;
      }
    }
  };

  const handleCalendarUpdateSubmit = data => {
    setCreateUnavibilityCalendarDate({
      ...data,
      userId: user.id,
      userName: user.name,
    });
  };

  useFetchAPIData({
    apiFunction: createUnavibilityCalendar,
    apiCallCondition: Object.keys(createUnavibilityCalendarDate).length,
    apiParams: createUnavibilityCalendarDate,
    accessPath: ['data'],
    dependencyArray: [createUnavibilityCalendarDate],
    successCb: data => successCb(data, 'update'),
  });

  const [{ isLoading }] = useFetchAPIData({
    apiFunction: getUnavibilityCalendar,
    apiCallCondition: Object.keys(calendarBody).length,
    apiParams: calendarBody,
    accessPath: ['data'],
    dependencyArray: [calendarBody],
    successCb: data => successCb(data, 'get'),
  });

  return [
    {
      isLoading,
      calendarList,
      formikRef,
    },
    {
      handleCalendarUpdateSubmit,
    },
  ];
};

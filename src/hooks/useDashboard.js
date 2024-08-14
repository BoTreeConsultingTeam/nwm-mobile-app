import React, {useState} from 'react';
import {useFetchAPIData} from './common';
import {useSelector} from 'react-redux';
import {getDashboardData} from '../api /home';
import Camera from '../assets/icons/camera.svg';
import Calender from '../assets/icons/calendar.svg';
import Check from '../assets/icons/check.svg';
import Project from '../assets/icons/project.svg';
import {spacing} from '../styles';
import {useIsFocused} from '@react-navigation/native';

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const user = useSelector(state => state.login.user);
  const isFocused = useIsFocused();

  const successCb = data => {
    const dashboardCounts = data.data.dashboardCounts;
    const utilityCards = [
      {
        icon: Check,
        text: 'Need to be Accepted',
        count: dashboardCounts[0].value,
        style: {
          flex: 1,
          backgroundColor: '#FFFBF2',
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 12},
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          borderRadius: 8,
          marginTop: spacing.md,
          marginHorizontal: spacing.sm,
          paddingBottom: spacing.sm,
          marginBottom: spacing.sm,
        },
      },
      {
        icon: Project,
        text: 'Active Projects',
        count: dashboardCounts[1].value,
        style: {
          flex: 1,
          backgroundColor: '#EAF9FF',
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 12},
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          borderRadius: 8,
          marginTop: spacing.md,
          marginHorizontal: spacing.sm,
          paddingBottom: spacing.sm,
          marginBottom: spacing.sm,
        },
      },
      {
        icon: Calender,
        text: 'Mark Unavailability',
        count: 0,
        style: {
          flex: 1,
          backgroundColor: '#EAF9FF',
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 12},
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          borderRadius: 8,
          marginTop: spacing.sm,
          marginHorizontal: spacing.sm,
          paddingBottom: spacing.sm,
          marginBottom: spacing.md,
        },
      },
      {
        icon: Camera,
        text: 'Recents',
        count: 0,
        style: {
          flex: 1,
          backgroundColor: '#EAF9FF',
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 12},
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          borderRadius: 8,
          marginTop: spacing.sm,
          marginHorizontal: spacing.sm,
          paddingBottom: spacing.sm,
          marginBottom: spacing.md,
        },
      },
    ];
    setDashboardData(utilityCards);
  };

  const [{isLoading}] = useFetchAPIData({
    accessPath: ['data'],
    apiCallCondition: isFocused,
    dependencyArray: [isFocused],
    apiParams: {userId: user.id},
    apiFunction: getDashboardData,
    successCb: successCb,
  });
  return [{dashboardData, isLoading}, {}];
};

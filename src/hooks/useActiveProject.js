/* eslint-disable no-lone-blocks */
import React, { useCallback, useEffect, useState } from 'react';
import { useFetchAPIData } from './common';
import { getActiveProjectList } from '../api /project';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { useIsFocused } from '@react-navigation/native';

export const useActiveProject = () => {
  const [getActiveProjectBody, setActiveProjectBody] = useState({});
  const [activeProjectList, setActiveProjectList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const userId = useSelector(state => state.login.user.id);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState({
    ProjectType: null,
    sortBy: null,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const isFocused = useIsFocused();

  const handleModal = () => {
    setModalOpen(prev => !prev);
  };
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (userId && isFocused) {
      setActiveProjectList([]);
      setActiveProjectBody({
        userId: userId,
        Page: 1,
        ItemsPerPage: 10,
      });
    }
  }, [isFocused]);

  const handleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handleSearchTextChange = text => {
    setSearchValue(text);
    debounceSearch(text);
  };

  const debounceSearch = useCallback(
    debounce(value => {
      setActiveProjectList([]);
      setActiveProjectBody({
        userId: userId,
        Page: 1,
        ItemsPerPage: 10,
        Search: value,
      });
    }, 500),
    [],
  );

  const handleFilterApply = () => {
    setActiveProjectList([]);
    closeModal();
    setActiveProjectBody({
      userId: userId,
      Page: 1,
      ItemsPerPage: 10,
      ...filterValue,
    });
  };

  const clearFilter = () => {
    setActiveProjectList([]);
    closeModal();
    setActiveProjectBody({
      userId: userId,
      Page: 1,
      ItemsPerPage: 10,
    });
    setFilterValue({
      ProjectType: null,
      sortBy: null,
    });
  };

  const fetchNextPage = () => {
    if (!endReached && !isPaginationLoading) {
      setActiveProjectBody({
        page: currentPage + 1,
        itemsPerPage: 10,
        userId: userId,
      });
      setCurrentPage(prev => prev + 1);
      setIsPaginationLoading(true);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setActiveProjectList([]);
    setCurrentPage(1);
    setEndReached(false);
    setActiveProjectBody({
      page: 1,
      itemsPerPage: 10,
      userId: userId,
    });
  };

  const successCb = (data, type) => {
    switch (type) {
      case 'get':
        {
          setIsPaginationLoading(false);
          setActiveProjectBody({});
          setActiveProjectList(prev => [...prev, ...data?.data]);
          setEndReached(currentPage >= data.pagination.totalPages);
          setRefreshing(false);
        }
        break;
      default:
        break;
    }
  };

  const filterValueChange = (value, type) => {
    setFilterValue({
      ...filterValue,
      [type]: value,
    });
  };

  // const getActiveProject = () => {
  //   setActiveProjectBody({
  //     userId: userId,
  //     page: 1,
  //     itemsPerPage: 10,
  //   });
  // };

  const [{ isLoading }] = useFetchAPIData({
    accessPath: ['data', 'pagination'],
    apiCallCondition: Object.keys(getActiveProjectBody).length,
    dependencyArray: [getActiveProjectBody],
    apiParams: getActiveProjectBody,
    apiFunction: getActiveProjectList,
    successCb: data => successCb(data, 'get'),
    failureCb: e => {
      console.log(e);
    },
  });

  return [
    {
      getActiveProjectBody,
      activeProjectList,
      currentPage,
      endReached,
      isPaginationLoading,
      refreshing,
      isLoading,
      isSearchBarVisible,
      searchValue,
      filterValue,
      modalOpen,
    },
    {
      fetchNextPage,
      handleRefresh,
      successCb,
      handleSearchBar,
      handleSearchTextChange,
      filterValueChange,
      handleFilterApply,
      handleModal,
      closeModal,
      clearFilter,
    },
  ];
};

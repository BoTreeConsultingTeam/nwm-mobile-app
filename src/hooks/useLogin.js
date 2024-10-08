import { useState } from 'react';
import { loginUser } from '../api/login';
import { useFetchAPIData } from './common';
import { useDispatch } from 'react-redux';
import { setToken } from '../reducers/login';

export const useLogin = () => {
  const [loginBody, setLoginBody] = useState({});
  const dispatch = useDispatch();
  const successCb = data => {
    console.log('🚀 ~ successCb ~ data:', data);
    setLoginBody({});
    dispatch(setToken(data?.data));
  };

  const handleLoginSubmit = data => {
    setLoginBody(data);
  };

  const [{ isLoading }] = useFetchAPIData({
    accessPath: ['data'],
    apiCallCondition: Object.keys(loginBody).length,
    apiParams: loginBody,
    dependencyArray: [loginBody],
    apiFunction: loginUser,
    successCb: successCb,
    hideErrorMessage: false,
    showSuccessMessage: true,
    failureCb: e => {
      console.log(e);
    },
  });

  return [
    {
      isLoading,
    },
    {
      handleLoginSubmit,
    },
  ];
};

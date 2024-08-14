import { useState } from 'react';
import { forgotPassword } from '../api /login';
import { useFetchAPIData } from './common';
import { showToast } from '../utility/methods/other';

export const useForgotPassword = ({ navigation }) => {
  const [forgotPasswordBody, setForgotPasswordBody] = useState({});
  const successCb = data => {
    showToast(data.message);
    setForgotPasswordBody({});
    navigation.navigate('login');
  };

  const handleForgotPasswordSubmit = data => {
    setForgotPasswordBody(data);
  };

  const [{ data, isLoading }] = useFetchAPIData({
    accessPath: ['message'],
    apiCallCondition: Object.keys(forgotPasswordBody).length,
    apiParams: forgotPasswordBody,
    dependencyArray: [forgotPasswordBody],
    apiFunction: forgotPassword,
    successCb: successCb,
    failureCb: e => {
      console.log(e);
    },
  });

  return [
    {
      isLoading,
    },
    {
      handleForgotPasswordSubmit,
    },
  ];
};

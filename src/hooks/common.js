import { useState, useEffect } from 'react';
import { showToast, getDataFromObjectUsingPaths } from '../utility/methods/other';

const useFetchAPIData = ({
  accessPath,
  apiFunction,
  apiParams,
  dependencyArray,
  apiCallCondition,
  defaultResponseValue,
  hideErrorMessage,
  errorMessage,
  showSuccessMessage,
  successMessage,
  successCb,
  failureCb,
}) => {
  const [state, setState] = useState({
    data: defaultResponseValue,
    isLoading: false,
    hasError: false,
  });
  const { data, isLoading, hasError } = state;
  useEffect(() => {
    if (apiCallCondition) {
      setState({ ...state, isLoading: true, hasError: false });
      apiFunction?.(apiParams)
        .then(res => {
          if (res.data.success) {
            const resData =
              getDataFromObjectUsingPaths(res.data, accessPath) ||
              defaultResponseValue;
            setState({
              ...state,
              isLoading: false,
              hasError: false,
              data: resData,
            });
            successCb?.(resData);
            showSuccessMessage && showToast(successMessage || res.data.message);
          } else {
            setState({
              ...state,
              isLoading: false,
              hasError: true,
              data: defaultResponseValue,
            });
            failureCb?.(res);
            !hideErrorMessage && showToast(errorMessage || res.data.message);
          }
        })
        .catch(error => {
          console.log('🚀 ~ useEffect ~ error:', error);
          setState({ ...state, isLoading: false, hasError: true });
          failureCb?.(error);
          !hideErrorMessage &&
            showToast(errorMessage || error?.response?.data?.message);
        });
    }
  }, dependencyArray);

  return [{ data, isLoading, hasError }];
};

export { useFetchAPIData };

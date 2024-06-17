import Config from 'react-native-config';

const {APP_ENV, LOCAL_API_URL, STAGING_API_URL, PRODUCTION_API_URL} = Config;

export const useShowToast = () => {
  // const toast = useToast();
  // const showToast = ({ text, type, placement = 'top' }) => {
  //   if (text) {
  //     return toast.show({
  //       placement: placement,
  //       render: ({ id }) => {
  //         const toastId = 'toast-' + id;
  //         return (
  //           <Toast nativeID={toastId} action={type} variant="accent">
  //             <ToastTitle>{text}</ToastTitle>
  //           </Toast>
  //         );
  //       },
  //     });
  //   }
  // };
  // return showToast;
};

export const getAPIBaseURL = () => {
  if (APP_ENV === 'local') {
    return LOCAL_API_URL;
  }
  if (APP_ENV === 'staging') {
    return STAGING_API_URL;
  }
  if (APP_ENV === 'production') {
    return PRODUCTION_API_URL;
  }
  return LOCAL_API_URL;
};

const getNestedObject = (nestedObj = {}, path = '') => {
  return path
    .split('.')
    .reduce(
      (obj, key) => (obj[key] !== 'undefined' ? obj[key] : undefined),
      nestedObj,
    );
};

export const getDataFromObjectUsingPaths = (nestedObj, paths = '') => {
  if (typeof paths === 'object' && paths.constructor === Array) {
    let data = {};
    paths.forEach(path => {
      const pathArray = path.split('.');
      data = {...data, [pathArray.pop()]: getNestedObject(nestedObj, path)};
    });
    return data;
  }
  return getNestedObject(nestedObj, paths);
};

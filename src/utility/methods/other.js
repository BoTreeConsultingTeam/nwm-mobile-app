import { Snackbar } from 'react-native-paper';
import Config from 'react-native-config';
import { ToastAndroid } from 'react-native';
const { APP_ENV, BASE_URL } = Config;

export const showToast = text => {
  if (text) {
    ToastAndroid.show(text, ToastAndroid.LONG, ToastAndroid.CENTER);
    // return (
    //   <Snackbar
    //     visible={true}
    //     duration={2000}
    //     onDismiss={() => { }}
    //     action={{
    //       label: 'Undo',
    //       onPress: () => {
    //         // Do something
    //       },
    //     }}>
    //     {text}
    //   </Snackbar>
    // );
  }
};

export const getAPIBaseURL = () => {
  if (APP_ENV === 'local') {
    return BASE_URL;
  }
  if (APP_ENV === 'staging') {
    return BASE_URL;
  }
  if (APP_ENV === 'production') {
    return BASE_URL;
  }
  return BASE_URL;
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
      data = { ...data, [pathArray.pop()]: getNestedObject(nestedObj, path) };
    });
    return data;
  }
  return getNestedObject(nestedObj, paths);
};

import { useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { addFirebaseTokenToBackend } from '../../api/notification';
import { showToast } from '../methods/other';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export function useFcmService() {
  // const user = '';
  const user = useSelector(state => state.login.user);
  // const notificationsEnabled = useSelector(
  //   state => state.notifications.enabled,
  // );

  // useEffect(() => {
  //   // Handle token registration and updates here
  //   if (user?.id) {
  //     checkPermission();
  //   }
  // }, [user]);

  const checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          createNotificationListeners(onRegister);
        } else if (user?.id) {
          requestPermission(onRegister);
        }
      })
      .catch(error => {
        // Handle error
      });
  };

  const register = onRegister => {
    checkPermission(onRegister);
  };

  const getToken = onRegister => {
    if (user?.id) {
      messaging()
        .getToken()
        .then(token => {
          if (token) {
            addFirebaseTokenToBackend({
              platform: Platform.OS,
              deviceToken: token,
              userId: user.id,
            });
            AsyncStorage.setItem('FCM_TOKEN', token);
            onRegister(token);
          }
        })
        .catch(error => {
          // Handle error
        });
    }
  };

  const requestPermission = () => {
    messaging()
      .requestPermission({
        alert: true,
        badge: true,
        sound: true,
      })
      .then(status => {
        const enabled =
          status === messaging.AuthorizationStatus.AUTHORIZED ||
          status === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled && user.id) {
          createNotificationListeners();
        } else {
          showToast("Allow to use this app's notifications");
        }
      })
      .catch(() => {
        showToast("Allow to use this app's notifications");
      });
  };

  const deleteToken = () => {
    messaging()
      .deleteToken()
      .then(() => {
        AsyncStorage.getItem('FCM_TOKEN').then(token => {
          // removeFirebaseToken({ token });
          AsyncStorage.removeItem('FCM_TOKEN');
        });
      })
      .catch(error => {
        // Handle error
      });
  };

  const createNotificationListeners = onRegister => {
    getToken(onRegister);
    const onTokenRefreshListener = messaging().onTokenRefresh(token => {
      AsyncStorage.setItem('FCM_TOKEN', token);
      addFirebaseTokenToBackend({
        platform: Platform.OS,
        deviceToken: token,
        userId: user.id,
      });
      onRegister(token);
    });

    return () => {
      onTokenRefreshListener();
    };
  };

  const unRegister = () => {
    messaging().deleteToken();
    AsyncStorage.removeItem('FCM_TOKEN');
  };

  return {
    register,
    checkPermission,
    getToken,
    requestPermission,
    deleteToken,
    unRegister,
  };
}

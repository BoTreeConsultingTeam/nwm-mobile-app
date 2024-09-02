import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Navigator from './src/setup/navigator';
import { persistor, store } from './src/setup/store';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import RNBootSplash from 'react-native-bootsplash';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';
import { PermissionsAndroid } from 'react-native';

const isIOS = Platform.OS === 'ios';

let channelId;

(async function () {
  if (!isIOS) {
    channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.DEFAULT,
      visibility: AndroidVisibility.PUBLIC,
      vibration: true,
      vibrationPattern: [300, 500],
      lights: true,
    });
  }
})();

messaging().onMessage(async remoteMessage => {
  notifee.displayNotification({
    title: remoteMessage?.title,
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'notification',
      },
    },
  });
});
messaging().setBackgroundMessageHandler(async remoteMessage => {
  notifee.displayNotification({
    title: remoteMessage?.title,
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'notification',
      },
    },
  });
});

export default function App() {
  const navigationDeferred = new Deferred();

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 100);
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    notifee.onForegroundEvent(async ({ type, detail }) => {
      const { notification } = detail;
      switch (type) {
        case EventType.PRESS:
        case EventType.ACTION_PRESS:
          navigationDeferred.promise.then(navigation => {
            navigation.navigate('homeStack', { screen: 'notification' });
          });
          break;
      }
      await notifee.cancelNotification(notification.id);
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification } = detail;

      // Check if the user pressed the "Mark as read" action
      if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
        // Update external API
        navigationDeferred.promise.then(navigation => {
          navigation.navigate('homeStack', { screen: 'notification' });
        });
        // Remove the notification
        await notifee.cancelNotification(notification.id);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer
            ref={navigatorRef => navigationDeferred.resolve(navigatorRef)}>
            <Navigator />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

function Deferred() {
  this.promise = new Promise((resolve, reject) => {
    this.reject = reject;
    this.resolve = resolve;
  });
}

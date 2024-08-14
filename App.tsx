import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Navigator from './src/setup/navigator';
import { persistor, store } from './src/setup/store';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import RNBootSplash from 'react-native-bootsplash';
import { useEffect } from 'react';

export default function App() {
  const navigationDeferred = new Deferred();

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 100);
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

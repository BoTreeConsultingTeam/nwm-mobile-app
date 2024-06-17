import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, AppState} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import {colors} from '../../styles';

const NoInternetAlert = () => {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        NetInfo.fetch().then(state => {
          setIsConnected(state.isConnected);
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return unsubscribe;
  }, []);

  if (!isConnected) {
    return (
      <View style={[styles.offlineContainer]}>
        <Text style={styles.offlineText}>No internet connection</Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: colors.backgroundError,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    // position: "relative",
    zIndex: 10000,
  },
  offlineText: {color: colors.textWhite},
});

export default NoInternetAlert;

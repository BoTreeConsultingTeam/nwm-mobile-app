import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../../styles';

const FullScreenLoader = ({loaderText}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} animating color={colors.primary} />
      {loaderText && <Text style={styles.text}>Loading, Please wait</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7 )',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 16,
  },
});
export default FullScreenLoader;

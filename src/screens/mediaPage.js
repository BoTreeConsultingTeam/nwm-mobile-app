import React, { useMemo } from 'react';
import { WithContainer } from '../components';
import { Image, StyleSheet, View } from 'react-native';

const MediaPage = ({ navigation, route }) => {
  const { path } = route.params;
  const source = useMemo(() => ({ uri: path }), [path]);

  return (
    <WithContainer
      pageTitle={'Photo'}
      actions={[]}
      onBackPress={() => navigation.navigate('uploadPhoto')}>
      <View style={styles.main}>
        <Image
          source={source}
          style={StyleSheet.absoluteFillObject}
          resizeMode="contain"
        />
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
export default MediaPage;

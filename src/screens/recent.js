import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {WithContainer} from '../components';
import {colors} from '../styles';
import RecentItem from '../components/recent/recentItem';

const Recent = ({navigation}) => {
  return (
    <WithContainer
      pageTitle={'Recents'}
      actions={[
        {
          icon: 'pencil-outline',
        },
        {
          icon: 'trash-can-outline',
        },
      ]}
      scrollView>
      <View style={styles.main}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={() => <RecentItem navigation={navigation} />}
        />
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 70,
  },
});
export default Recent;

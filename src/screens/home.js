import React from 'react';
import { WithContainer } from '../components';
import { FlatList, PermissionsAndroid, StyleSheet, View } from 'react-native';
import UtilityCard from '../components/home/utilityCard';

import { spacing } from '../styles';
import { useDashboard } from '../hooks/useDashboard';

const Home = ({ navigation }) => {
  const [{ dashboardData }] = useDashboard();

  const handleCardClick = async item => {
    switch (item.text) {
      case 'Need to be Accepted':
        navigation.navigate('requestStack');
        break;
      case 'Active Projects':
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        navigation.navigate('activeProject');
        break;
      case 'Recents':
        navigation.navigate('recentStack', { screen: 'recent' });
        break;
      case 'Mark Unavailability':
        navigation.navigate('markUnavailability');
        break;
    }
  };

  return (
    <WithContainer
      // pageTitle={'Home'}
      searchBar
      headerStyle={styles.header}
      searchStyle={styles.searchStyle}
      searchPlaceHolder={'Search'}
      actions={[
        {
          icon: 'bell-badge-outline',
          size: 28,
          style: { marginTop: 20 },
          onPress: () => navigation.navigate('notification'),
        },
      ]}
      loading={false}>
      <View style={styles.cards}>
        <FlatList
          data={dashboardData}
          renderItem={({ item, index }) => (
            <UtilityCard
              key={index}
              {...item}
              onClick={() => handleCardClick(item)}
            />
          )}
          numColumns={2}
        />
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  searchStyle: {
    width: '50%',
    borderRadius: spacing.sm,
    height: 50,
    marginTop: -5,
  },
  header: {
    marginBottom: spacing.md,
    backgroundColor: '#fff',
  },
  cards: {
    padding: spacing.md,
    backgroundColor: 'white',
    flex: 1,
  },
});
export default Home;

import React from 'react';
import {WithContainer} from '../components';
import {FlatList, PermissionsAndroid, StyleSheet, View} from 'react-native';
import UtilityCard from '../components/home/utilityCard';
import Camera from '../assets/icons/camera.svg';
import Calender from '../assets/icons/calendar.svg';
import Check from '../assets/icons/check.svg';
import Project from '../assets/icons/project.svg';
import {spacing} from '../styles';

const Home = ({navigation}) => {
  const utilityCards = [
    {
      icon: Check,
      text: 'Need to be Accepted',
      count: 10,
      style: {
        flex: 1,
        backgroundColor: '#FFFBF2',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 12},
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        borderRadius: 8,
        marginTop: spacing.md,
        marginHorizontal: spacing.sm,
        paddingBottom: spacing.sm,
        marginBottom: spacing.sm,
      },
    },
    {
      icon: Project,
      text: 'Active Projects',
      count: 8,
      style: {
        flex: 1,
        backgroundColor: '#EAF9FF',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 12},
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        borderRadius: 8,
        marginTop: spacing.md,
        marginHorizontal: spacing.sm,
        paddingBottom: spacing.sm,
        marginBottom: spacing.sm,
      },
    },
    {
      icon: Calender,
      text: 'Mark Unavailability',
      count: 0,
      style: {
        flex: 1,
        backgroundColor: '#EAF9FF',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 12},
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        borderRadius: 8,
        marginTop: spacing.sm,
        marginHorizontal: spacing.sm,
        paddingBottom: spacing.sm,
        marginBottom: spacing.md,
      },
    },
    {
      icon: Camera,
      text: 'Recents',
      count: 0,
      style: {
        flex: 1,
        backgroundColor: '#EAF9FF',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 12},
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        borderRadius: 8,
        marginTop: spacing.sm,
        marginHorizontal: spacing.sm,
        paddingBottom: spacing.sm,
        marginBottom: spacing.md,
      },
    },
  ];

  const handleCardClick = async item => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    switch (item.text) {
      case 'Active Projects':
        navigation.navigate('activeProject');
        break;
      case 'Recents':
        navigation.navigate('recentStack', {screen: 'recent'});
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
      onSearchValueChange={() => {}}
      searchValue=""
      searchStyle={styles.searchStyle}
      searchPlaceHolder={'Search'}
      actions={[
        {
          icon: 'bell-badge-outline',
          size: 28,
          style: {marginTop: 20},
          onPress: () => navigation.navigate('notification'),
        },
      ]}
      loading={false}>
      <View style={styles.cards}>
        <FlatList
          data={utilityCards}
          renderItem={({item, index}) => (
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

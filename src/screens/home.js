import React from 'react';
import {WithContainer} from '../components';
import {FlatList, StyleSheet, View} from 'react-native';
import UtilityCard from '../components/home/utilityCard';
import Camera from '../assets/icons/camera.svg';
import Calender from '../assets/icons/calendar.svg';
import Check from '../assets/icons/check.svg';
import Project from '../assets/icons/project.svg';
import {spacing} from '../styles';

const Home = () => {
  const utilityCards = [
    {
      icon: Camera,
      text: 'Camera',
      count: 5,
      style: {
        flex: 1,
        backgroundColor: '#FFFBF2',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 12},
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        borderRadius: 8,
        marginTop: spacing.sm,
        marginHorizontal: spacing.sm,
        paddingBottom: spacing.sm,
      },
    },
    {
      icon: Calender,
      text: 'Calendar',
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
        marginTop: spacing.sm,
        marginHorizontal: spacing.sm,
        paddingBottom: spacing.sm,
      },
    },
    {
      icon: Check,
      text: 'Checklist',
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
        marginTop: spacing.md,
        marginHorizontal: spacing.sm,
        paddingBottom: spacing.sm,
        marginBottom: spacing.md,
      },
    },
    {
      icon: Project,
      text: 'Projects',
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
        marginTop: spacing.md,
        marginHorizontal: spacing.sm,
        paddingBottom: spacing.sm,
        marginBottom: spacing.md,
      },
    },
  ];

  return (
    <WithContainer
      // pageTitle={'Home'}
      searchBar
      headerStyle={styles.header}
      onSearchValueChange={() => {}}
      searchValue=""
      searchStyle={styles.searchStyle}
      searchPlaceHolder={'Search'}
      actions={[{icon: 'bell-badge-outline', style: {marginTop: 15}}]}
      loading={false}>
      <View style={styles.cards}>
        <FlatList
          data={utilityCards}
          renderItem={({item, index}) => (
            <UtilityCard key={index} {...item} />
            // <View style={styles.itemContainer}>
            //   <Text style={styles.item}>{item.value}</Text>
            // </View>
          )}
          numColumns={2}
        />
        {/* {utilityCards.map((item, index) => {
          return <UtilityCard key={index} {...item} />;
        })} */}
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  searchStyle: {
    width: '80%',
    borderRadius: spacing.sm,
    marginTop: 15,
    marginLeft: spacing.sm,
  },
  header: {
    marginBottom: spacing.md,
  },
  cards: {
    padding: spacing.md,
    backgroundColor: 'white',
    flex: 1,
  },
});
export default Home;

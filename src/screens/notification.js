import React from 'react';
import {WithContainer} from '../components';
import {FlatList, StyleSheet, View} from 'react-native';
import NotificationItem from '../components/notification/notificationItem';
import NotificationDemo1 from '../assets/icons/notification-demo1.png';
import NotificationDemo2 from '../assets/icons/notification-demo2.png';
import NotificationDemo3 from '../assets/icons/notification-demo3.png';
import NotificationDemo4 from '../assets/icons/notification-demo4.png';

const Notification = ({navigation}) => {
  const demoData = [
    {
      name: 'Pancham Icon',
      time: '5 min ago',
      date: '',
      text: 'You Received New Project',
      image: NotificationDemo1,
    },
    {
      name: 'Kasper Bliss',
      time: '1 day ago',
      date: 'Dec 28',
      text: 'Due Date Soon',
      image: NotificationDemo2,
    },
    {
      name: 'Dream Icon',
      time: '10 day ago',
      date: '',
      text: 'You Received New Project',
      image: NotificationDemo3,
    },
    {
      name: 'Nilamber Triumph',
      time: '5 min ago',
      date: 'Dec 31',
      text: 'Due Date Soon',
      image: NotificationDemo4,
    },
  ];

  return (
    <WithContainer
      actions={[]}
      pageTitle={'Notification'}
      onBackPress={() => navigation.goBack()}>
      <View style={styles.main}>
        <FlatList
          data={demoData}
          contentContainerStyle={styles.list}
          renderItem={({item}) => <NotificationItem item={item} />}
        />
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
export default Notification;

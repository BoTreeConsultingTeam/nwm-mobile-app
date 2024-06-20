import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, WithContainer} from '../components';
import {colors, fontSizes, radius, spacing} from '../styles';
import RequestItem from '../components/projectRequest/requestItem';
import RequestDemo1 from '../assets/icons/request-demo1.png';
import RequestDemo2 from '../assets/icons/request-demo2.png';
import RequestDemo3 from '../assets/icons/request-demo3.png';
import RequestDemo4 from '../assets/icons/request-demo4.png';

const ProjectRequest = ({navigation}) => {
  const demoData = [
    {
      name: 'Pancham Icon',
      location: 'Huntington Station, NY 11746',
      time: '1 day ago',
      image: RequestDemo1,
    },
    {
      name: 'Kasper Bliss',
      location: 'Bozeman, MT 59715',
      time: '12 hours ago',
      image: RequestDemo2,
    },
    {
      name: 'Dream Icon',
      location: 'San Diego, CA 92103',
      time: '1 week ago',
      image: RequestDemo3,
    },
    {
      name: 'Nilamber Triumph',
      location: 'Sardis, TN 3837',
      time: '10 min ago',
      image: RequestDemo4,
    },
  ];

  return (
    <WithContainer
      pageTitle={'New Project Request'}
      actions={[
        {
          icon: 'magnify',
        },
        {
          icon: 'bell-badge-outline',
          onPress: () => navigation.navigate('notification'),
        },
      ]}>
      <View style={styles.main}>
        <FlatList
          data={demoData}
          contentContainerStyle={{paddingBottom: 20}}
          renderItem={({item, index}) => (
            <RequestItem item={item} index={index} />
          )}
        />
        <View style={{paddingHorizontal: 20}}>
          <Button
            text={'Accept All'}
            isLoading={false}
            textStyle={styles.buttonText}
            rippleContainerBorderRadius={radius.radius8}
            style={styles.button}
          />
        </View>
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonText: {
    color: colors.success,
    fontSize: fontSizes.size16,
  },
  button: {
    borderRadius: radius.radius8,
    backgroundColor: '#D8FFD5',
    paddingHorizontal: spacing.md,
    alignSelf: 'center',
    marginTop: spacing.md,
  },
});
export default ProjectRequest;

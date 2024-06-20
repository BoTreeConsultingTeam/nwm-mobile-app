import React, {useState} from 'react';
import {WithContainer} from '../components';
import {FlatList, StyleSheet, View} from 'react-native';
import ProjectCard from '../components/Project/projectCard';
import ProjectFilter from '../components/Project/projectFilter';

const ActiveProject = ({navigation}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(prev => !prev);
  };
  const closeModal = () => setModalOpen(false);

  const projectData = [
    {
      name: 'Pancham Icon',
      address: 'Nilamber Triumph / 3409',
      location: 'S.G. Highway, Rajpath Club, Ahmedabad, Gujrat',
      status: 'assigned',
      person1: 'Joseph ',
      person2: 'Shawn ',
      start: 'Mon, Nov 28',
      end: 'Thu, Jan 28',
    },
    {
      name: 'Missoula',
      address: '182 Lords Way',
      location: 'Sardis, TN 3837',
      status: 're-work',
      person1: 'Allen ',
      person2: 'David ',
      start: 'Wed, Jun 28',
      end: 'Fri, Oct 21',
    },
    {
      name: 'Quincy',
      address: '3592 Ocello Street',
      location: 'San Diego, CA 92103',
      status: 'assigned',
      person1: 'Bradley ',
      person2: 'Candace ',
      start: 'Mon, Mar 06',
      end: 'Fri, Jul 28',
    },
    {
      name: 'Kasper Bliss',
      address: '5 Horizon Circle',
      location: 'Tacoma, WA 98402',
      status: 'completed',
      person1: 'Joseph ',
      person2: 'Shawn',
      start: 'Thu, Jan 25',
      edn: 'Tue, Feb 28',
    },
    {
      name: 'Yonkers',
      address: '3836 Feathers Hooves Drive',
      location: 'Huntington Station, NY 11746',
      status: 'assigned',
      person1: 'David ',
      person2: 'Candace ',
      start: 'Mon, Jun 28',
      end: 'Fri, Oct 21',
    },
    {
      name: 'Buena Park',
      address: '1375 Masonic Drive',
      location: 'Bozeman, MT 59715',
      status: 'completed',
      person1: 'Bradley ',
      person2: 'Allen ',
      start: 'Sat, Jan 04',
      end: 'Wed, Mar 12',
    },
  ];

  return (
    <WithContainer
      onBackPress={() => navigation.goBack()}
      pageTitle="Active Projects"
      headerStyle={{backgroundColor: '#fff'}}
      actions={[
        {
          icon: 'magnify',
        },
        {
          icon: 'tune',
          onPress: handleModal,
        },
        {
          icon: 'bell-badge-outline',
          onPress: () => navigation.navigate('notification'),
        },
      ]}>
      <View styles={styles.container}>
        <FlatList
          style={styles.subContainer}
          data={projectData}
          renderItem={({item}) => {
            return <ProjectCard {...item} navigation={navigation} />;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <ProjectFilter modalOpen={modalOpen} closeModal={closeModal} />
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
  },
  subContainer: {
    paddingHorizontal: 10,
    marginBottom: 70,
    backgroundColor: '#fff',
  },
});
export default ActiveProject;

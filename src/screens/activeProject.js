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
    },
    {
      name: 'Pancham Icon',
      address: 'Nilamber Triumph / 3409',
      location: 'S.G. Highway, Rajpath Club, Ahmedabad, Gujrat',
      status: 're-work',
    },
    {
      name: 'Pancham Icon',
      address: 'Nilamber Triumph / 3409',
      location: 'S.G. Highway, Rajpath Club, Ahmedabad, Gujrat',
      status: 'assigned',
    },
    {
      name: 'Pancham Icon',
      address: 'Nilamber Triumph / 3409',
      location: 'S.G. Highway, Rajpath Club, Ahmedabad, Gujrat',
      status: 'completed',
    },
    {
      name: 'Pancham Icon',
      address: 'Nilamber Triumph / 3409',
      location: 'S.G. Highway, Rajpath Club, Ahmedabad, Gujrat',
      status: 'assigned',
    },
    {
      name: 'Pancham Icon',
      address: 'Nilamber Triumph / 3409',
      location: 'S.G. Highway, Rajpath Club, Ahmedabad, Gujrat',
      status: 'completed',
    },
  ];

  return (
    <WithContainer
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

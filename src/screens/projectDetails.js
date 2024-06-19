import React, {useState} from 'react';
import {Button, Ripple, WithContainer} from '../components';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {Badge, Card, Chip, Icon} from 'react-native-paper';
import LocationPinIcon from '../assets/icons/location-pin.svg';
import {colors, fontFaces, fontSizes, radius, spacing} from '../styles';
import DateIcon from '../assets/icons/date.svg';
import PersonIcon from '../assets/icons/person.svg';
import NoteIcon from '../assets/icons/note.svg';
import DocumentIcon from '../assets/icons/document.svg';
import CameraIcon from '../assets/icons/camera.svg';
import MapIcon from '../assets/icons/map.svg';
import Instructions from '../components/projectDetails/instructions';
import ProjectConfirmationModal from '../components/projectDetails/confirmationModal';

const ProjectDetails = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  const handleModal = () => {
    setVisible(!visible);
  };

  const handleCardClick = item => {
    switch (item.name) {
      case 'Photos':
        navigation.navigate('uploadPhoto');
        break;
      case 'Note':
        navigation.navigate('note');
    }
  };
  const renderStatus = status => {
    switch (status) {
      case 'assigned':
        return (
          <Chip
            textStyle={{fontSize: 12, margin: 0}}
            style={styles.chipAssigned}
            selectedColor={colors.white}>
            Assigned
          </Chip>
        );
      case 're-work':
        return (
          <Chip style={styles.chipRework} selectedColor={colors.white}>
            Re-Work
          </Chip>
        );
      case 'completed':
        return (
          <Chip style={styles.chipComplete} selectedColor={colors.white}>
            Completed
          </Chip>
        );
    }
  };

  const detailsCardList = [
    {
      name: 'Note',
      icon: <NoteIcon />,
      count: 3,
      color: '#FFE4E4',
      badgeColor: colors.warning,
    },
    {
      name: 'Documents',
      icon: <DocumentIcon />,
      count: 2,
      color: '#D8FFD5',
      badgeColor: colors.success,
    },
    {
      name: 'Photos',
      icon: <Icon source={'camera-outline'} size={30} color={colors.primary} />,
      count: 4,
      color: '#DCE4FF',
      badgeColor: colors.primary,
    },
    {
      name: 'Direction',
      icon: <MapIcon />,
      color: colors.card2,
    },
  ];

  const instructionList = [
    'Lorem Ipsum is simply dummy text of the printing',
    'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy.',
    'Lorem Ipsum is simply dummy text of the printing',
  ];

  const detailsCard = item => {
    return (
      <Card
        style={styles.card}
        mode="elevated"
        elevation={3}
        theme={{
          roundness: 2,
        }}>
        <Ripple
          style={styles.detailCardContainer}
          onPress={() => handleCardClick(item)}>
          <View
            style={{
              backgroundColor: item.color,
              height: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}>
            {item.icon}
          </View>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: colors.textNormal}}>{item.name}</Text>
          </View>
          {item.count ? (
            <Badge
              style={[
                styles.countBadge,
                {backgroundColor: item.color, color: item.badgeColor},
              ]}>
              {item.count}
            </Badge>
          ) : null}
        </Ripple>
      </Card>
    );
  };

  return (
    <WithContainer
      headerStyle={styles.header}
      onBackPress={() => navigation.goBack()}
      pageTitle="Project Details"
      actions={[]}
      scrollView
      scrollViewStyle={styles.scrollView}
      searchBar={false}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.projectName}>
            <Icon source="home-outline" size={24} color={colors.secondary} />
            <View style={styles.projectDetails}>
              <Text
                style={[
                  styles.projectText,
                  {fontWeight: '500', fontSize: fontSizes.size18},
                ]}>
                Pancham Icon
              </Text>
              <Text style={styles.projectText}>Nilamber Triumph / 3409</Text>
            </View>
            {renderStatus('assigned')}
          </View>
          <View style={styles.location}>
            <LocationPinIcon style={styles.locationIcon} />
            <Text style={styles.locationText}>
              S.G. Highway, Rajpath Club, Ahmedabad, Gujrat, 380059
            </Text>
          </View>
          <View style={styles.dates}>
            <View style={styles.dateContact}>
              <View style={styles.date}>
                <DateIcon style={styles.dateIcon} />
                <View style={styles.dateContainer}>
                  <Text style={styles.dateTextField}>Start: </Text>
                  <Text style={styles.dateText}>Fri, Dec 29</Text>
                </View>
              </View>
              <View style={styles.date}>
                <DateIcon style={styles.dateIcon} />
                <View style={styles.dateContainer}>
                  <Text style={styles.dateTextField}>End:</Text>
                  <Text style={styles.dateText}> Fri, Dec 29</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.profile}>
            <PersonIcon style={styles.profileIcon} />
            <Text style={styles.profileText}>Khushboo Talreja</Text>
          </View>
        </View>
        <View style={styles.detailCard}>
          <FlatList
            data={detailsCardList}
            renderItem={({item}) => detailsCard(item)}
            numColumns={2}
          />
        </View>
        <Instructions
          title={'Schedule Instructions'}
          instructionList={instructionList}
        />
        <Instructions
          title={'Inspection Instructions'}
          instructionList={instructionList}
        />
        <View style={styles.personDetails}>
          <Text style={styles.personField}>LBC: </Text>
          <Text style={styles.personValue}>2345677</Text>
        </View>
        <View style={styles.personDetails}>
          <Text style={styles.personField}>POC: </Text>
          <Text style={styles.personValue}>Abhishek Sharma, 987-654-3210</Text>
        </View>
        <View style={styles.personDetails}>
          <Text style={styles.personField}>NWM POC: </Text>
          <Text style={styles.personValue}>Jaymin Trivedi, 987-654-3210</Text>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Button
            text={'Submit'}
            isLoading={false}
            textStyle={styles.buttonText}
            rippleContainerBorderRadius={radius.radius8}
            style={styles.button}
            onPress={() => handleModal()}
          />
        </View>
        <ProjectConfirmationModal
          modalOpen={visible}
          closeModal={handleModal}
        />
      </View>
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    padding: 20,
    paddingTop: 10,
  },
  projectName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  locationText: {
    color: colors.placeHolder,
    marginBottom: 5,
    width: '90%',
    marginTop: 3,
    alignSelf: 'flex-start',
    ...fontFaces.regular.normal,
  },
  projectText: {
    color: colors.text1,
    ...fontFaces.regular.medium,
  },
  projectDetails: {
    marginLeft: 8,
  },
  chipAssigned: {
    textAlign: 'center',
    margin: 0,
    height: 30,
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: colors.tagPurple,
  },
  chipRework: {
    position: 'absolute',
    right: 0,
    backgroundColor: colors.warning,
  },
  chipComplete: {
    position: 'absolute',
    right: 0,
    backgroundColor: colors.success,
  },
  locationIcon: {
    marginLeft: 4,
    marginRight: 3,
  },
  dateIcon: {
    marginLeft: 3,
  },
  profileIcon: {
    marginLeft: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  dates: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContact: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  dateTextField: {
    marginLeft: 9,
    color: colors.placeHolder,
  },
  dateText: {
    marginLeft: 3,
    color: colors.placeHolder,
    ...fontFaces.regular.normal,
  },
  profile: {
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  profileText: {
    marginLeft: 11,
    color: colors.placeHolder,
    ...fontFaces.regular.normal,
  },
  detailCard: {
    marginLeft: 10,
  },
  countBadge: {
    position: 'absolute',
    top: 0,
    right: -3,
    fontWeight: '900',
  },
  detailCardContainer: {
    height: 60,
    width: Dimensions.get('screen').width / 2 - 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    marginRight: 10,
    marginBottom: 20,
    height: 60,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  personDetails: {
    marginHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 5,
  },
  personField: {
    fontSize: fontSizes.size16,
    ...fontFaces.regular.medium,
    color: colors.textNormal,
  },
  personValue: {
    fontSize: fontSizes.size16,
    ...fontFaces.regular.normal,
    color: colors.textNormal,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes.size16,
  },
  button: {
    borderRadius: radius.radius8,
    backgroundColor: '#00529B',
    paddingHorizontal: spacing.md,
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  scrollView: {
    marginBottom: 70,
  },
});

export default ProjectDetails;

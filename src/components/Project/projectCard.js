import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, Icon, Chip} from 'react-native-paper';
import {colors, fontFaces, fontSizes} from '../../styles';
import DateIcon from '../../assets/icons/date.svg';
import LocationPinIcon from '../../assets/icons/location-pin.svg';

const ProjectCard = ({name, address, location, status, navigation}) => {
  const renderStatus = status => {
    switch (status) {
      case 'assigned':
        return (
          <Chip style={styles.chipAssigned} selectedColor={colors.white}>
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

  const statusBackgroundMapper = {
    assigned: colors.card1,
    're-work': colors.card2,
    completed: colors.white,
  };

  return (
    <Card
      onPress={() => navigation.navigate('projectDetails')}
      style={[styles.main, {backgroundColor: statusBackgroundMapper[status]}]}>
      <Card.Content>
        <View style={styles.container}>
          <View style={styles.projectName}>
            <Icon source="home-outline" size={24} color={colors.secondary} />
            <View style={styles.projectDetails}>
              <Text
                style={[
                  styles.projectText,
                  {fontWeight: '700', fontSize: fontSizes.size16},
                ]}>
                {name}
              </Text>
              <Text style={styles.projectText}>{address}</Text>
            </View>
            {renderStatus(status)}
          </View>
          <View style={styles.location}>
            <LocationPinIcon style={styles.locationIcon} />
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.locationText}>
              {location}
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
              <View style={styles.contact}>
                <Text style={styles.contactTextField}>Abhishek:</Text>
                <Text style={styles.contactText}> 987-654-3210</Text>
              </View>
            </View>
            <View style={styles.dateContact}>
              <View style={styles.date}>
                <DateIcon style={styles.dateIcon} />
                <View style={styles.dateContainer}>
                  <Text style={styles.dateTextField}>End:</Text>
                  <Text style={styles.dateText}> Fri, Dec 29</Text>
                </View>
              </View>
              <View style={styles.contact}>
                <Text style={styles.contactTextField}>Abhishek:</Text>
                <Text style={styles.contactText}> 987-654-3210</Text>
              </View>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#EFFFFE',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    marginVertical: 5,
    marginHorizontal: 5,
    marginBottom: 10,
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
  container: {},
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
    position: 'absolute',
    right: 0,
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
    marginLeft: 3,
  },
  dateIcon: {
    marginLeft: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    marginLeft: 8,
    fontWeight: '700',
    ...fontFaces.regular.bold,
  },
  dateText: {
    marginLeft: 3,
    ...fontFaces.regular.normal,
  },
  contact: {
    flexDirection: 'row',
  },
  contactTextField: {
    marginLeft: 8,
    fontWeight: '700',
    ...fontFaces.regular.bold,
  },
  contactText: {
    marginLeft: 3,
    ...fontFaces.regular.normal,
  },
});
export default ProjectCard;

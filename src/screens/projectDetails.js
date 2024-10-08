import React, { useState } from 'react';
import { Button, Ripple, WithContainer } from '../components';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Badge, Card, Chip, Icon } from 'react-native-paper';
import LocationPinIcon from '../assets/icons/location-pin.svg';
import { colors, fontFaces, fontSizes, radius, spacing } from '../styles';
import DateIcon from '../assets/icons/date.svg';
import PersonIcon from '../assets/icons/person.svg';
import NoteIcon from '../assets/icons/note.svg';
import DocumentIcon from '../assets/icons/document.svg';
import MapIcon from '../assets/icons/map.svg';
import Instructions from '../components/projectDetails/instructions';
import ProjectConfirmationModal from '../components/projectDetails/confirmationModal';
import { useProjectDetails } from '../hooks/useProjectDetails';
import moment from 'moment-timezone';

const ProjectDetails = ({ navigation, route }) => {
  const { projectId, edit } = route?.params;

  const [
    { isLoading, projectDetails, visible },
    { handleProjectSubmit, handleModal },
  ] = useProjectDetails({
    projectId: projectId,
    navigation: navigation,
  });
  console.log('🚀 ~ ProjectDetails ~ projectDetails:', projectDetails.endDate);

  const handleCardClick = item => {
    switch (item.name) {
      case 'Photos':
        navigation.navigate('uploadPhoto', {
          projectId: projectId,
          edit,
        });
        break;
      case 'Note':
        navigation.navigate('note', {
          projectId: projectId,
          edit,
        });
        break;
      case 'Documents':
        navigation.navigate('document', {
          projectId: projectId,
        });
        break;
    }
  };
  const renderStatus = status => {
    switch (status) {
      case 'assigned':
      case 'Ready':
        return (
          <Chip
            textStyle={{ fontSize: 12, margin: 0 }}
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
      count: projectDetails.notesCount,
      color: '#FFE4E4',
      badgeColor: colors.warning,
    },
    {
      name: 'Documents',
      icon: <DocumentIcon />,
      count: projectDetails.docsCount,
      color: '#D8FFD5',
      badgeColor: colors.success,
    },
    {
      name: 'Photos',
      icon: <Icon source={'camera-outline'} size={30} color={colors.primary} />,
      count: projectDetails.photoCount,
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
            <Text style={{ color: colors.textNormal }}>{item.name}</Text>
          </View>
          {item.count ? (
            <Badge
              style={[
                styles.countBadge,
                { backgroundColor: item.color, color: item.badgeColor },
              ]}>
              {item.count}
            </Badge>
          ) : null}
        </Ripple>
      </Card>
    );
  };

  return (
    <>
      <WithContainer
        headerStyle={styles.header}
        onBackPress={() => navigation.goBack()}
        pageTitle="Project Details"
        actions={[]}
        scrollView={isLoading ? false : true}
        scrollViewStyle={styles.scrollView}
        searchBar={false}>
        <View style={styles.container}>
          {isLoading ? (
            <View style={styles.noContent}>
              <ActivityIndicator animating color={colors.primary} />
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.subContainer}>
                <View style={styles.projectName}>
                  <Icon
                    source="home-outline"
                    size={24}
                    color={colors.secondary}
                  />
                  <View style={styles.projectDetails}>
                    <Text
                      style={[
                        styles.projectText,
                        { fontWeight: '500', fontSize: fontSizes.size18 },
                      ]}>
                      {projectDetails?.name}
                    </Text>
                  </View>
                  {renderStatus(projectDetails.status)}
                </View>
                <View style={styles.location}>
                  <LocationPinIcon style={styles.locationIcon} />
                  <Text style={styles.locationText}>
                    {projectDetails?.projectAddress}
                  </Text>
                </View>
                <View style={styles.dates}>
                  <View style={styles.dateContact}>
                    <View style={styles.date}>
                      <DateIcon style={styles.dateIcon} />
                      <View style={styles.dateContainer}>
                        <Text style={styles.dateTextField}>Start: </Text>
                        <Text style={styles.dateText}>
                          {moment(projectDetails?.startDate).format(
                            'MM/DD/YYYY',
                          )}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.date}>
                      <DateIcon style={styles.dateIcon} />
                      <View style={styles.dateContainer}>
                        <Text style={styles.dateTextField}>End:</Text>
                        <Text style={styles.dateText}>
                          {' '}
                          {moment(projectDetails?.clientDueDate).format(
                            'MM/DD/YYYY',
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.profile}>
                  <PersonIcon style={styles.profileIcon} />
                  <Text style={styles.profileText}>
                    {projectDetails?.borrowerName}
                  </Text>
                </View>
              </View>
              <View style={styles.detailCard}>
                <FlatList
                  data={detailsCardList}
                  renderItem={({ item }) => detailsCard(item)}
                  numColumns={2}
                />
              </View>
              <Instructions
                title={'Inspection Notes'}
                instructionList={projectDetails.inspectorNotes}
              />
              <Instructions
                title={'Miscellaneous Notes'}
                instructionList={projectDetails.miscNotes}
              />
              <View style={styles.personDetails}>
                <Text style={styles.personField}>LBC: </Text>
                <Text style={styles.personValue}>2345677</Text>
              </View>
              <View style={styles.personDetails}>
                <Text style={styles.personField}>POC: </Text>
                <Text style={styles.personValue}>
                  {projectDetails.lenderIndividual},{' '}
                  {projectDetails.lenderCompany}, {projectDetails.lenderPhoneNo}{' '}
                  {projectDetails.lenderEmail}
                </Text>
              </View>

              <ProjectConfirmationModal
                modalOpen={visible}
                closeModal={handleModal}
                handleProjectSubmit={handleProjectSubmit}
              />
            </View>
          )}
        </View>
      </WithContainer>
      {edit && !isLoading && (
        <View
          style={{
            paddingHorizontal: 20,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <Button
            text={'Submit'}
            isLoading={false}
            textStyle={styles.buttonText}
            rippleContainerBorderRadius={radius.radius8}
            style={styles.button}
            onPress={() => handleModal()}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
  },
  noContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 30,
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
    marginHorizontal: spacing.md,
    flexDirection: 'row',
    marginVertical: 5,
    paddingRight: spacing.sm,
  },
  personField: {
    fontSize: fontSizes.size16,
    ...fontFaces.regular.medium,
    color: colors.textNormal,
    lineHeight: fontSizes.size24,
  },
  personValue: {
    fontSize: fontSizes.size16,
    ...fontFaces.regular.normal,
    color: colors.textNormal,
    marginRight: spacing.md,
    lineHeight: fontSizes.size24,
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

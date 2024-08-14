import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ripple, WithContainer } from '../components';
import { colors, fontFaces, fontSizes } from '../styles';
import { TabScreen, Tabs, TabsProvider } from 'react-native-paper-tabs';
import {
  ActivityIndicator,
  Card,
  Chip,
  FAB,
  Icon,
  Portal,
  Tooltip,
} from 'react-native-paper';
import DateIcon from '../assets/icons/date.svg';
import AddNoteModal from '../components/notes/addNote';
import { useNote } from '../hooks/useNote';
import moment from 'moment-timezone';

const Notes = ({ navigation, route }) => {
  const demoData = [
    {
      date: 'Jan 28, 2023 | 15:42',
      name: 'Joseph A. Bess',
      note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis laboriosam cupiditate aut illo debitis, sunt, inventore sequi nobis qui quis non aspernatur quo consectetur reprehenderit accusamus blanditiis dolorum. Repudiandae, expedita.',
    },
    {
      date: 'Dec 28, 2022 | 15:42',
      name: 'Bradley A. Rodgers',
      note: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo rerum blanditiis ducimus laudantium cum maxime exercitationem excepturi magni architecto, expedita, quibusdam animi quae temporibus ad voluptas quaerat aliquam? Quod, id.',
    },
    {
      date: 'Nov 28, 2022 | 08:42',
      name: 'David N. Arrington',
      note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, doloremque voluptate ipsa eos ipsum fugiat, eligendi accusamus quibusdam laboriosam pariatur, veritatis ducimus repudiandae error aut sunt? Deleniti a exercitationem perspiciatis?',
    },
    {
      date: 'Oct 21, 2022 | 16:30',
      name: 'Allen M. Rugg',
      note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, earum sit tempora optio ratione, iusto, eveniet unde voluptate aspernatur vitae assumenda expedita eum. Recusandae quisquam, culpa porro officia corrupti suscipit?',
    },
    {
      date: 'Jun 28, 2022 | 21:56',
      name: 'Shawn N. Steppe',
      note: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure fugit illo et, soluta sunt maxime quasi officiis numquam expedita? Beatae quod unde earum illum harum, debitis eos aperiam asperiores fugiat.',
    },
    {
      date: 'Mar 12, 2022 | 15:00',
      name: 'David N. Arrington',
      note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, doloremque voluptate ipsa eos ipsum fugiat, eligendi accusamus quibusdam laboriosam pariatur, veritatis ducimus repudiandae error aut sunt? Deleniti a exercitationem perspiciatis?',
    },
    {
      date: 'Jan 04, 2022 | 12:00',
      name: 'Allen M. Rugg',
      note: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, earum sit tempora optio ratione, iusto, eveniet unde voluptate aspernatur vitae assumenda expedita eum. Recusandae quisquam, culpa porro officia corrupti suscipit?',
    },
  ];

  const [
    {
      isAddNoteModalOpen,
      currentTab,
      listOfProjectNotes,
      listOfInspectionNotes,
      isInspectionNoteLoading,
      isProjectNoteLoading,
      editNoteData,
    },
    {
      handleAddNoteClick,
      handleNoteSubmit,
      handleTabChange,
      handleDeleteNote,
      handleEditNoteClick,
    },
  ] = useNote({
    params: route.params,
  });

  const renderItem = (item, type) => {
    return (
      <Card
        style={styles.card}
        mode="elevated"
        elevation={3}
        theme={{
          roundness: 2,
        }}>
        <View style={styles.main}>
          <View style={styles.titleView}>
            <Chip style={styles.chip} selectedColor={colors.primary}>
              {type}
            </Chip>
            <View style={styles.date}>
              <DateIcon />
              <Text style={styles.dateText}>
                {moment(item.createdOn).format('MMM DD, YYYY | hh:mm')}
              </Text>
            </View>
          </View>
          <View style={styles.name}>
            <Text style={styles.text}>{item.firstName}</Text>
            <Ripple
              rippleContainerBorderRadius={50}
              onPress={() => handleEditNoteClick(item)}>
              <Icon source="pencil" size={18} color={colors.secondary} />
            </Ripple>
          </View>
          <View style={styles.name}>
            <Tooltip title={item.note}>
              <Text style={[styles.text, styles.note]}>{item.note}</Text>
            </Tooltip>
            <Ripple
              rippleContainerBorderRadius={50}
              onPress={() => handleDeleteNote(item)}>
              <Icon source="delete" size={18} color={colors.secondary} />
            </Ripple>
          </View>
        </View>
      </Card>
    );
  };
  const tabMapper = {
    project: 0,
    inspection: 1,
    0: 'project',
    1: 'inspection',
  };

  return (
    <WithContainer
      actions={[]}
      pageTitle={'Note'}
      searchBar={false}
      onBackPress={() => navigation.goBack()}
      headerStyle={styles.header}>
      <View style={styles.container}>
        <TabsProvider
          defaultIndex={tabMapper[currentTab]}
          onChangeIndex={index => handleTabChange(tabMapper[index])}>
          <Tabs
            style={styles.tab}
            theme={{
              colors: {
                primary: colors.primary,
              },
            }}>
            <TabScreen label="Project">
              {isProjectNoteLoading ? (
                <View style={styles.noContent}>
                  <ActivityIndicator animating color={colors.primary} />
                </View>
              ) : listOfProjectNotes.length ? (
                <FlatList
                  contentContainerStyle={{ paddingBottom: 10 }}
                  data={listOfProjectNotes}
                  renderItem={({ item }) => renderItem(item, 'Project')}
                />
              ) : (
                <View style={styles.noContent}>
                  <Text style={styles.text}>No Results Found</Text>
                </View>
              )}
            </TabScreen>
            <TabScreen label="Inspection">
              {isInspectionNoteLoading ? (
                <View style={styles.noContent}>
                  <ActivityIndicator animating color={colors.primary} />
                </View>
              ) : listOfInspectionNotes.length ? (
                <FlatList
                  contentContainerStyle={{ paddingBottom: 10 }}
                  data={listOfInspectionNotes}
                  renderItem={({ item }) => renderItem(item, 'Inspection')}
                />
              ) : (
                <View style={styles.noContent}>
                  <Text style={styles.text}>No Results Found</Text>
                </View>
              )}
            </TabScreen>
          </Tabs>
        </TabsProvider>
        <Portal>
          <FAB.Group
            visible={!isAddNoteModalOpen}
            fabStyle={styles.fabBackground}
            color={colors.white}
            style={styles.fabContainer}
            actions={[]}
            icon={'plus'}
            open={false}
            onStateChange={handleAddNoteClick}
          />
        </Portal>
      </View>
      <AddNoteModal
        modalOpen={isAddNoteModalOpen}
        closeModal={handleAddNoteClick}
        handleNoteSubmit={handleNoteSubmit}
        currentTab={currentTab}
        editNoteData={editNoteData}
      />
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
  },
  noContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tab: {
    backgroundColor: colors.white,
  },
  card: {
    marginRight: 10,
    marginBottom: 10,
    height: 'auto',
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  main: {
    // height: '100%',
    padding: 10,
  },
  date: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 5,
  },
  dateText: {
    paddingLeft: 5,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  chip: {
    height: 35,
    padding: 0,
    margin: 0,
    fontSize: fontSizes.size10,
    backgroundColor: colors.backgroundPrimary,
  },
  fabBackground: {
    backgroundColor: colors.primary,
  },
  fabContainer: {
    paddingBottom: 10,
    paddingRight: 10,
  },
  text: {
    color: colors.textNormal,
    fontSize: fontSizes.size14,
    ...fontFaces.regular.medium,
    paddingBottom: 10,
  },
  note: {
    color: colors.textNormal,
    fontSize: fontSizes.size14,
    ...fontFaces.regular.normal,
    paddingBottom: 5,
    lineHeight: fontSizes.size18,
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Notes;

import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {WithContainer} from '../components';
import {colors, fontFaces, fontSizes} from '../styles';
import {TabScreen, Tabs, TabsProvider} from 'react-native-paper-tabs';
import {Card, Chip, FAB, Portal, Tooltip} from 'react-native-paper';
import DateIcon from '../assets/icons/date.svg';

const Notes = ({navigation}) => {
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

  const renderItem = item => {
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
              Project
            </Chip>
            <View style={styles.date}>
              <DateIcon />
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </View>
          <Text style={styles.text}>{item.name}</Text>
          <Tooltip title={item.note}>
            <Text style={[styles.text, styles.note]}>{item.note}</Text>
          </Tooltip>
        </View>
      </Card>
    );
  };

  return (
    <WithContainer
      actions={[]}
      pageTitle={'Note'}
      searchBar={false}
      onBackPress={() => navigation.goBack()}>
      <View style={styles.container}>
        <TabsProvider>
          <Tabs
            theme={{
              colors: {
                primary: colors.primary,
              },
            }}>
            <TabScreen label="Project">
              <FlatList
                data={demoData}
                renderItem={({item}) => renderItem(item)}
              />
            </TabScreen>
            <TabScreen label="Inspection">
              <FlatList
                data={demoData}
                renderItem={({item}) => renderItem(item)}
              />
            </TabScreen>
          </Tabs>
        </TabsProvider>
        <Portal>
          <FAB.Group
            fabStyle={styles.fabBackground}
            color={colors.white}
            style={styles.fabContainer}
            actions={[]}
            icon={'plus'}
            open={false}
            onStateChange={() => {}}
          />
        </Portal>
      </View>
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
export default Notes;

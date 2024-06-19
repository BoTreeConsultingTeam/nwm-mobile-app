import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {WithContainer} from '../components';
import {colors, fontSizes} from '../styles';
import {TabScreen, Tabs, TabsProvider} from 'react-native-paper-tabs';
import {Card, Chip, FAB, Portal} from 'react-native-paper';
import DateIcon from '../assets/icons/date.svg';

const Notes = ({navigation}) => {
  const renderItem = () => {
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
              <Text style={styles.dateText}>Dec 28, 2023 | 15:42</Text>
            </View>
          </View>
          <Text>Abhishek sharma</Text>
          <Text>Hello ...</Text>
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
                data={[1, 2, 3, 4, 5, 6]}
                renderItem={() => renderItem()}
              />
            </TabScreen>
            <TabScreen label="Inspection">
              <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                renderItem={() => renderItem()}
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
    height: 125,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  main: {
    height: '100%',
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
});
export default Notes;

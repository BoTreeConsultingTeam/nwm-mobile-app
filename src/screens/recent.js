import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { WithContainer } from '../components';
import { colors } from '../styles';
import RecentItem from '../components/recent/recentItem';
import RecentDemo1 from '../assets/icons/recent-demo1.png';
import RecentDemo2 from '../assets/icons/recent-demo2.png';
import RecentDemo3 from '../assets/icons/recent-demo3.png';
import { useRecent } from '../hooks/useRecent';

const Recent = ({ navigation }) => {
  const demoData = [
    {
      name: 'Pancham Icon',
      date: 'Jan 09, 2023 | 08:42',
      note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo sunt id esse ullam voluptatibus consequuntur maiores, ad fuga facilis soluta rerum. Mollitia qui dignissimos reprehenderit magnam sequi est provident alias.',
      image: RecentDemo1,
    },
    {
      name: 'Kasper Bliss',
      date: 'Dec 28, 2022 | 15:42',
      note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolores modi minus facilis architecto vero molestiae doloribus quasi repellendus obcaecati porro iure, hic, error eveniet nemo odit nesciunt dolorum tenetur?',
      image: RecentDemo2,
    },
    {
      name: 'Dream Icon',
      date: 'Jul 28, 2022 | 06:42',
      note: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui numquam sed repellat nostrum eveniet molestias blanditiis consequuntur deserunt repellendus in, rem aut iste unde praesentium non libero architecto id. Voluptatibus!',
      image: RecentDemo3,
    },
  ];

  const [{ recentProjectList }] = useRecent();

  return (
    <WithContainer pageTitle={'Recent'} actions={[]}>
      <View style={styles.main}>
        <FlatList
          data={recentProjectList}
          renderItem={({ item }) => (
            <RecentItem item={item} navigation={navigation} />
          )}
        />
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 70,
  },
});
export default Recent;

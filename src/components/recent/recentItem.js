import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import CircleCheckGreen from '../../assets/icons/circle-check-green.svg';
import DateIcon from '../../assets/icons/date.svg';
import DemoImage from '../../assets/icons/demo.png';
import {colors, fontFaces, fontSizes} from '../../styles';
import Ripple from '../common/ripple';
const RecentItem = ({navigation}) => {
  return (
    <Card
      style={styles.card}
      mode="elevated"
      elevation={3}
      theme={{
        roundness: 2,
      }}>
      <Ripple
        style={styles.main}
        onPress={() => navigation.navigate('photo-editor')}>
        <View style={styles.imageView}>
          <Image source={DemoImage} style={styles.image} />
        </View>
        <View style={styles.detailsView}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Pancham icon</Text>
            <CircleCheckGreen />
          </View>
          <View style={styles.date}>
            <DateIcon />
            <Text style={styles.dateText}>Dec 28, 2023 | 15:42</Text>
          </View>
          <Text style={styles.descriptionText}>Line</Text>
        </View>
      </Ripple>
    </Card>
  );
};
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    height: '100%',
  },
  card: {
    marginRight: 10,
    marginBottom: 10,
    height: 100,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  detailCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 10,
  },
  date: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  dateText: {
    paddingLeft: 5,
  },
  imageView: {
    flex: 1.5,
  },
  image: {
    flex: 1.5,
    width: '100%',
    height: '100%',
    resizeMode: 'fit',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  detailsView: {
    paddingLeft: 15,
    flex: 2,
  },
  titleText: {
    fontSize: fontSizes.size18,
    ...fontFaces.regular.medium,
    color: colors.textNormal,
  },
  descriptionText: {
    fontSize: fontSizes.size16,
  },
});
export default RecentItem;

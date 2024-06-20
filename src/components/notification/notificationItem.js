import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import DemoImage from '../../assets/icons/demo2.png';
import {colors, fontFaces, fontSizes} from '../../styles';
import Ripple from '../common/ripple';
import DateIcon from '../../assets/icons/date.svg';

const NotificationItem = ({item, navigation}) => {
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
        // onPress={() => navigation.navigate('photo-editor')}
      >
        <View style={styles.imageView}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={styles.detailsView}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{item.name}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <View style={styles.descriptionView}>
            <Text style={styles.descriptionText}>{item.text}</Text>
            {item.date && (
              <View style={styles.date}>
                <DateIcon />
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
            )}
          </View>
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
    height: 70,
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
    paddingRight: 10,
  },
  imageView: {
    flex: 1,
  },
  image: {
    flex: 1,
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
    fontSize: fontSizes.size16,
    ...fontFaces.regular.medium,
    color: colors.textNormal,
  },
  descriptionText: {
    fontSize: fontSizes.size14,
  },
  time: {
    fontSize: fontSizes.size12,
    ...fontFaces.regular.normal,
  },
  descriptionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default NotificationItem;

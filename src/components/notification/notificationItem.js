import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import DemoImage from '../../assets/icons/demo2.png';
import { colors, fontFaces, fontSizes } from '../../styles';
import Ripple from '../common/ripple';
import DateIcon from '../../assets/icons/date.svg';
import moment from 'moment-timezone';

const NotificationItem = ({ item, navigation }) => {
  return (
    <Card
      style={styles.card}
      mode="elevated"
      elevation={2}
      theme={{
        roundness: 1,
      }}>
      <Ripple
        style={styles.main}
      // onPress={() => navigation.navigate('photo-editor')}
      >
        {/* <View style={styles.imageView}>
          <Image source={item.image} style={styles.image} />
        </View> */}
        <View style={styles.detailsView}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{item?.name}</Text>
            <Text style={styles.time}>{moment(item.createdOn).fromNow()}</Text>
          </View>
          <View style={styles.descriptionView}>
            <Text style={styles.descriptionText}>{item.message}</Text>
            {item?.date && (
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
    paddingBottom: 15,
    flex: 1,
    // height: 'auto',
    marginLeft: 5,
    marginTop: 5,
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
    color: colors.textNormal,
  },
  time: {
    fontSize: fontSizes.size12,
    ...fontFaces.regular.normal,
    color: colors.placeHolder,
  },
  descriptionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default NotificationItem;

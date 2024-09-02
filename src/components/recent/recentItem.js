import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import CircleCheckGreen from '../../assets/icons/circle-check-green.svg';
import DateIcon from '../../assets/icons/date.svg';
import { colors, fontFaces, fontSizes } from '../../styles';
import Ripple from '../common/ripple';
import moment from 'moment-timezone';
const RecentItem = ({ navigation, item }) => {
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
        onPress={() =>
          navigation.navigate('homeStack', {
            screen: 'projectDetails',
            params: { projectId: item.projectId, edit: false },
          })
        }>
        {/* <View style={styles.imageView}>
          <Image source={item.image} style={styles.image} />
        </View> */}
        <View style={styles.detailsView}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{item.projectName}</Text>
            <CircleCheckGreen />
          </View>
          <View style={styles.date}>
            <DateIcon />
            <Text style={styles.dateText}>
              {item.createdOn && moment(item.createdOn).format('DD/MM/YYYY')}
            </Text>
          </View>
          <Text style={styles.descriptionText} numberOfLines={2}>
            {item.note}
          </Text>
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
    height: 80,
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
    paddingBottom: 10,
    paddingTop: 5,
  },
  date: {
    flexDirection: 'row',
    paddingBottom: 5,
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
    fontSize: fontSizes.size16,
    ...fontFaces.regular.medium,
    color: colors.textNormal,
  },
  descriptionText: {
    fontSize: fontSizes.size14,
  },
});
export default RecentItem;

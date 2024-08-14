import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import Ripple from '../common/ripple';
import { colors, fontFaces, fontSizes, radius } from '../../styles';
import Button from '../common/button';
import LocationPinIcon from '../../assets/icons/location-pin.svg';
import DemoImage from '../../assets/icons/demo.png';
import moment from 'moment-timezone';
const RequestItem = ({ item, index, handleProjectRequest }) => {
  return (
    <Card
      style={styles.card}
      mode="elevated"
      elevation={3}
      theme={{
        roundness: 2,
      }}>
      <View
        style={styles.main}
      // onPress={() => navigation.navigate('photo-editor')}
      >
        {/* <View style={styles.imageView}>
          <Image source={item.image} style={styles.image} />
        </View> */}
        <View style={styles.detailsView}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{item.name}</Text>
            {item.time && <Text>{moment(item.createdOn).fromNow()}</Text>}
          </View>
          <View style={styles.location}>
            <LocationPinIcon style={styles.locationIcon} />
            <Text>{item.projectAddress}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              text={'Accept'}
              isLoading={false}
              textStyle={styles.buttonText}
              rippleContainerBorderRadius={radius.radius4}
              style={styles.button}
              onPress={() => handleProjectRequest(item, 'accept')}
            />
            <Button
              text={'Reject'}
              isLoading={false}
              textStyle={styles.rejectText}
              rippleContainerBorderRadius={radius.radius4}
              style={styles.rejectButton}
              onPress={() => handleProjectRequest(item, 'reject')}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    marginBottom: 10,
    height: 125,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  main: {
    flexDirection: 'row',
    height: '100%',
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
  locationIcon: {
    marginRight: 5,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  titleText: {
    fontSize: fontSizes.size16,
    ...fontFaces.regular.medium,
    color: colors.textNormal,
  },
  detailsView: {
    paddingLeft: 15,
    flex: 2,
  },
  buttonText: {
    color: colors.success,
    fontSize: fontSizes.size12,
  },
  rejectText: {
    color: colors.warning,
    fontSize: fontSizes.size12,
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: radius.radius4,
    backgroundColor: '#D8FFD5',
    paddingTop: 0,
    margin: 0,
    marginTop: 10,
  },
  rejectButton: {
    width: 80,
    height: 40,
    borderRadius: radius.radius4,
    backgroundColor: '#FFE4E4',
    paddingTop: 0,
    margin: 0,
    marginTop: 10,
    marginLeft: 10,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingRight: 10,
  },
});
export default RequestItem;

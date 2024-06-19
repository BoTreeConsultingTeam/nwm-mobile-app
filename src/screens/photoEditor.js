import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {WithContainer} from '../components';
import HomeImage from '../assets/icons/home-image.png';
import {colors, fontFaces, fontSizes} from '../styles';
import DateIcon from '../assets/icons/date.svg';

const PhotoEditor = ({navigation}) => {
  return (
    <WithContainer
      onBackPress={() => navigation.goBack()}
      pageTitle={'Photo Editor'}
      actions={[
        {
          icon: 'pencil-outline',
        },
        {
          icon: 'trash-can-outline',
        },
      ]}>
      <View style={styles.main}>
        <View style={styles.imageView}>
          <Image source={HomeImage} style={styles.image} />
        </View>
        <Text style={styles.titleText}>Kasper Bliss</Text>
        <View style={styles.date}>
          <DateIcon />
          <Text style={styles.dateText}>Dec 28, 2023 | 15:42</Text>
        </View>
      </View>
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  imageView: {
    height: 250,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: fontSizes.size18,
    ...fontFaces.regular.medium,
    color: colors.textNormal,
  },
  date: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  dateText: {
    paddingLeft: 5,
  },
});
export default PhotoEditor;

import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {colors} from '../styles';
import {WithContainer} from '../components';
import UploadDemo from '../assets/icons/upload-demo.png';
import {FAB, Portal} from 'react-native-paper';

const UploadPhoto = ({navigation}) => {
  const renderItem = index => {
    let specialStyle = {};
    if ((index + 1) % 2 === 0) {
      specialStyle = {
        marginLeft: 10,
      };
    }
    return (
      <View style={[styles.imageView, specialStyle]}>
        <Image styles={styles.image} source={UploadDemo} />
      </View>
    );
  };

  return (
    <WithContainer
      actions={[]}
      pageTitle={'Upload Photos'}
      onBackPress={() => navigation.goBack()}>
      <View style={styles.main}>
        <FlatList
          contentContainerStyle={styles.listStyle}
          data={[1, 2, 3, 4]}
          renderItem={({item, index}) => renderItem(index)}
          numColumns={2}
        />
        <Portal>
          <FAB.Group
            fabStyle={styles.fabBackground}
            color={colors.white}
            // style={styles.fabContainer}
            open={false}
            visible
            actions={[]}
            icon={'plus'}
            onStateChange={() => {}}
          />
        </Portal>
      </View>
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  listStyle: {
    paddingTop: 10,
    paddingRight: 20,
  },
  image: {
    height: 130,
    width: 130,
    resizeMode: 'contain',
  },
  imageView: {
    marginBottom: 10,
  },
  fabBackground: {
    backgroundColor: colors.primary,
  },
});
export default UploadPhoto;

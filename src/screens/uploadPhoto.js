import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  StyleSheet,
  View,
} from 'react-native';
import {colors} from '../styles';
import {WithContainer} from '../components';
import UploadDemo1 from '../assets/icons/upload-demo1.png';
import UploadDemo3 from '../assets/icons/upload-demo2.png';
import UploadDemo2 from '../assets/icons/upload-demo3.png';
import UploadDemo4 from '../assets/icons/upload-demo4.png';
import {FAB, Portal} from 'react-native-paper';
import {useCameraPermission} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';

const UploadPhoto = ({navigation}) => {
  const renderItem = (item, index) => {
    let specialStyle = {};
    if ((index + 1) % 2 === 0) {
      specialStyle = {
        marginLeft: 10,
      };
    }
    return (
      <View style={[styles.imageView, specialStyle]}>
        <Image styles={styles.image} source={item} />
      </View>
    );
  };
  const [fabShow, setFabshow] = useState(true);
  const isFocussed = useIsFocused();

  useEffect(() => {
    updateState();
  }, [isFocussed, updateState]);

  const updateState = useCallback(() => {
    setFabshow(isFocussed);
  }, [isFocussed]);

  const {hasPermission} = useCameraPermission();

  const checkForPermission = async () => {
    let granted = false;

    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === 'granted') {
      handleAddPhoto();
    }
  };

  const handleAddPhoto = () => {
    if (hasPermission) {
      navigation.navigate('camera');
    } else {
      checkForPermission();
    }
  };

  return (
    <WithContainer
      actions={[]}
      pageTitle={'Upload Photos'}
      onBackPress={() => navigation.goBack()}>
      <View style={styles.main}>
        <FlatList
          contentContainerStyle={styles.listStyle}
          data={[UploadDemo1, UploadDemo2, UploadDemo3, UploadDemo4]}
          renderItem={({item, index}) => renderItem(item, index)}
          numColumns={2}
        />
        <Portal>
          <FAB.Group
            fabStyle={styles.fabBackground}
            color={colors.white}
            // style={styles.fabContainer}
            open={false}
            visible={fabShow}
            actions={[]}
            icon={'plus'}
            onStateChange={() => handleAddPhoto()}
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
    paddingLeft: 20,
  },
  listStyle: {
    paddingTop: 10,
    paddingRight: 10,
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

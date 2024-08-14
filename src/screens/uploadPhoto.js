import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../styles';
import { WithContainer } from '../components';
import UploadDemo1 from '../assets/icons/upload-demo1.png';
import UploadDemo3 from '../assets/icons/upload-demo2.png';
import UploadDemo2 from '../assets/icons/upload-demo3.png';
import UploadDemo4 from '../assets/icons/upload-demo4.png';
import {
  ActivityIndicator,
  FAB,
  Icon,
  Portal,
  Snackbar,
} from 'react-native-paper';
import { useCameraPermission } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { useUploadPhoto } from '../hooks/useUploadPhoto';

const UploadPhoto = ({ navigation, route }) => {
  const [
    { isLoading, photoList },
    { handleAddPhoto, handleGetPhoto, handleDeleteImage },
  ] = useUploadPhoto({
    navigation: navigation,
    route: route,
  });

  const renderItem = (item, index) => {
    let specialStyle = {};
    if ((index + 1) % 2 === 0) {
      specialStyle = {
        marginLeft: 10,
      };
    }
    return (
      <View style={[styles.imageView, specialStyle]}>
        <Image
          source={{ uri: item.path }}
          resizeMode={'cover'} // cover or contain its upto you view look
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => handleDeleteImage(item.path)}>
          <Icon source={'close-circle'} size={20} />
        </TouchableOpacity>
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

  const checkForPermission = async type => {
    let granted = false;
    try {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      if (granted === 'granted') {
        if (type === 'camera') {
          handleAddPhoto();
        } else {
          handleGetPhoto();
        }
      } else {
        // checkForPermission();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [open, setOpen] = React.useState(false);

  const onStateChange = ({ open }) => setOpen(open);

  return (
    <WithContainer
      actions={[]}
      pageTitle={'Upload Photos'}
      onBackPress={() => navigation.goBack()}
      headerStyle={styles.header}>
      <View style={styles.main}>
        <Snackbar visible={isLoading}>Image Uploading...</Snackbar>
        {photoList.length ? (
          <FlatList
            contentContainerStyle={styles.listStyle}
            data={photoList}
            renderItem={({ item, index }) => renderItem(item, index)}
            numColumns={2}
          />
        ) : (
          <View style={styles.noContent}>
            <Text>No images found</Text>
          </View>
        )}
        <Portal>
          <FAB.Group
            fabStyle={styles.fabBackground}
            color={colors.white}
            containerStyle={styles.fabContainer}
            open={open}
            visible={fabShow}
            backdropColor={'transparent'}
            actions={[
              {
                icon: 'camera',
                label: 'Capture',
                color: colors.primary,
                onPress: () => checkForPermission('camera'),
              },
              {
                icon: 'image',
                label: 'Upload',
                color: colors.primary,
                onPress: () => checkForPermission('gallery'),
              },
            ]}
            icon={open ? 'close' : 'plus'}
            onStateChange={onStateChange}
          />
        </Portal>
      </View>
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
  },
  main: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    paddingLeft: 10,
  },
  listStyle: {
    paddingTop: 10,
    paddingRight: 10,
  },
  image: {
    height: Dimensions.get('window').width / 2 - 20,
    width: Dimensions.get('window').width / 2 - 20,
  },
  imageView: {
    position: 'relative',
    marginBottom: 10,
  },
  fabBackground: {
    backgroundColor: colors.primary,
  },
  fabContainer: {
    // backgroundColor: colors.card1,
  },
  closeIcon: {
    padding: 5,
    color: colors.primary,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  noContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
export default UploadPhoto;

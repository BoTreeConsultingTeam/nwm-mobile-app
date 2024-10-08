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
import { FAB, Icon, Portal, Snackbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { useUploadPhoto } from '../hooks/useUploadPhoto';

const UploadPhoto = ({ navigation, route }) => {
  const [
    { isLoading, photoList },
    { handleAddPhoto, handleGetPhoto, handleDeleteImage },
  ] = useUploadPhoto({
    navigation: navigation,
    route: route,
  });

  const { edit } = route.params;

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
        {edit && (
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => handleDeleteImage(item.path)}>
            <Icon source={'close-circle'} size={20} />
          </TouchableOpacity>
        )}
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
        <Snackbar style={{ zIndex: 1000 }} visible={isLoading}>
          Image Uploading...
        </Snackbar>
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
        {edit && (
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
        )}
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

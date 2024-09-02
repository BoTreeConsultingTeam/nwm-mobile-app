import React, { useEffect, useMemo, useRef, useState } from 'react';
import { WithContainer } from '../components';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MediaPage = ({ navigation, route }) => {
  // const { path } = route.params;
  // const source = useMemo(() => ({ uri: path }), [path]);

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const [images, setImages] = useState([]);
  const cameraRef = useRef(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

  useEffect(() => {
    takePicture();
  }, [isTakingPhoto]);

  const takePicture = async () => {
    if (isTakingPhoto) {
      return;
    }

    setIsTakingPhoto(true);

    const burstImages = [];
    // const photo = await camera.current.takePhoto();

    for (let i = 0; i < 10; i++) {
      const data = await cameraRef.current.takePhoto();

      burstImages.push(data.path);
    }

    setImages(burstImages);
    setIsTakingPhoto(false);
  };

  const startTakingPictures = () => {
    setIsTakingPhoto(true);
  };

  const stopTakingPictures = () => {
    setIsTakingPhoto(false);
  };

  return (
    <WithContainer
      pageTitle={'Photo'}
      actions={[]}
      onBackPress={() => navigation.navigate('uploadPhoto')}>
      <View style={styles.main}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo
        />
        <TouchableOpacity
          onPressIn={startTakingPictures}
          onPressOut={stopTakingPictures}
          style={styles.captureButton}>
          <Text style={{ fontSize: 24, color: 'white' }}>
            {isTakingPhoto ? 'Capturing...' : 'Capture'}
          </Text>
        </TouchableOpacity>
        {/* <Image
          source={source}
          style={StyleSheet.absoluteFillObject}
          resizeMode="contain"
        /> */}
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  captureButton: {
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MediaPage;

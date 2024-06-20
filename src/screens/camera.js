import React, {useCallback, useRef, useState} from 'react';
import {WithContainer} from '../components';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {StyleSheet} from 'react-native';
import {
  PinchGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';
import {CaptureButton} from '../components/camera/captureButton';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
const SCALE_FULL_ZOOM = 3;
const MAX_ZOOM_FACTOR = 10;
export const CONTENT_SPACING = 15;
export const SAFE_AREA_PADDING = {
  paddingLeft: StaticSafeAreaInsets.safeAreaInsetsLeft + CONTENT_SPACING,
  paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + CONTENT_SPACING,
  paddingRight: StaticSafeAreaInsets.safeAreaInsetsRight + CONTENT_SPACING,
  paddingBottom: 0 + CONTENT_SPACING,
};
const CameraPage = ({navigation}) => {
  const [cameraPosition, setCameraPosition] = useState('back');
  const device = useCameraDevice(cameraPosition, {
    physicalDevices: ['wide-angle-camera'],
  });
  const isFocussed = useIsFocused();
  const zoom = useSharedValue(1);
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);
  const camera = useRef(null);
  const onFocusTap = useCallback(
    ({nativeEvent: event}) => {
      if (!device?.supportsFocus) {
        return;
      }
      camera.current?.focus({
        x: event.locationX,
        y: event.locationY,
      });
    },
    [device?.supportsFocus],
  );
  const isPressingButton = useSharedValue(false);

  const setIsPressingButton = useCallback(
    _isPressingButton => {
      isPressingButton.value = _isPressingButton;
    },
    [isPressingButton],
  );
  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);
  const onDoubleTap = useCallback(() => {
    onFlipCameraPressed();
  }, [onFlipCameraPressed]);

  const onMediaCaptured = useCallback(
    (media, type) => {
      navigation.navigate('mediaPage', {
        path: media.path,
        type: type,
      });
    },
    [navigation],
  );

  const onPinchGesture = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startZoom = zoom.value;
    },
    onActive: (event, context) => {
      // we're trying to map the scale gesture to a linear zoom here
      const startZoom = context.startZoom ?? 0;
      const scale = interpolate(
        event.scale,
        [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
        [-1, 0, 1],
        Extrapolate.CLAMP,
      );
      zoom.value = interpolate(
        scale,
        [-1, 0, 1],
        [minZoom, startZoom, maxZoom],
        Extrapolate.CLAMP,
      );
    },
  });
  const supportsFlash = device?.hasFlash ?? false;
  const isActive = isFocussed;
  return (
    <WithContainer
      onBackPress={() => navigation.goBack()}
      actions={[]}
      pageTitle={'Photos'}>
      <PinchGestureHandler onGestureEvent={onPinchGesture} enabled={isActive}>
        <Reanimated.View
          onTouchEnd={onFocusTap}
          style={StyleSheet.absoluteFill}>
          <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
            <ReanimatedCamera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isActive}
              ref={camera}
              photoQualityBalance="quality"
              enableZoomGesture={false}
              exposure={0}
              enableFpsGraph={true}
              outputOrientation="device"
              photo={true}
              video={true}
            />
          </TapGestureHandler>
        </Reanimated.View>
      </PinchGestureHandler>
      {/* <Camera style={{ flex: 1 }} device={device} isActive={true} photo={true} /> */}
      <CaptureButton
        style={styles.captureButton}
        camera={camera}
        onMediaCaptured={onMediaCaptured}
        cameraZoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        flash={supportsFlash ? 'off' : 'off'}
        enabled={isActive}
        setIsPressingButton={setIsPressingButton}
      />
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
});
export default CameraPage;

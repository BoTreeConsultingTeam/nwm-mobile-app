import React from 'react';
import MaterialRipple from 'react-native-material-ripple';

const Ripple = ({
  onPress,
  children,
  style,
  rippleContainerBorderRadius,
  disabled,
  rippleColor,
  rippleCentered,
  rippleRef,
}) => (
  <MaterialRipple
    onPress={onPress}
    style={style}
    rippleContainerBorderRadius={rippleContainerBorderRadius}
    rippleCentered={rippleCentered}
    disabled={disabled}
    ref={rippleRef}
    rippleColor={rippleColor}>
    {children}
  </MaterialRipple>
);

export default Ripple;

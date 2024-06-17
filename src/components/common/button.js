import React from 'react';
import {Text, StyleSheet, Keyboard, Sp} from 'react-native';
import {Ripple} from '../index';
import {
  colors,
  spacing,
  // radius,
  fontSizes,
} from '../../styles/index';

const Button = ({
  style,
  onPress,
  text,
  disabled,
  isLoading,
  Icon,
  textStyle,
  spinnerStyle,
  rippleContainerBorderRadius,
  variant,
  noDisableStyle,
  no100PercentWidth,
}) => {
  const onButtonPress = () => {
    Keyboard.dismiss();
    onPress?.();
  };

  const rippleStyle = [
    variant === 'outlined' ? styles.buttonOutlined : styles.button,
    no100PercentWidth ? {} : {width: '100%'},
    style,
    ((disabled && !noDisableStyle) || isLoading) && {
      backgroundColor:
        variant === 'outlined'
          ? colors.backgroundLightGray
          : colors.backgroundButtonDisabled,
      borderColor: colors.backgroundButtonDisabled,
    },
  ];

  const spinnerStyleModified = [
    variant === 'outlined' ? styles.textOutlined : styles.text,
    spinnerStyle,
  ];
  const spinnerColorModified =
    variant === 'outlined'
      ? isLoading || (disabled && !noDisableStyle)
        ? colors.iconMediumRedDisabled
        : colors.iconMediumRed
      : colors.iconWhite;

  const textStyleModified = [
    variant === 'outlined' ? styles.textOutlined : styles.text,
    variant === 'outlined' &&
      (isLoading || (disabled && !noDisableStyle)) && {
        color: colors.backgroundButtonDisabled,
      },
    textStyle,
  ];

  return (
    <Ripple
      style={rippleStyle}
      disabled={disabled || isLoading}
      rippleContainerBorderRadius={rippleContainerBorderRadius || 48}
      onPress={!isLoading ? onButtonPress : null}>
      {isLoading ? (
        <></>
      ) : (
        // <Spinner
        //   size="small"
        //   style={spinnerStyleModified}
        //   color={spinnerColorModified}
        // />
        <>
          {!(!text && isLoading) && Icon ? <Icon /> : null}
          {text ? (
            <Text numberOfLines={1} style={textStyleModified}>
              {text}
            </Text>
          ) : null}
        </>
      )}
    </Ripple>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.size16,
    // lineHeight: 24,
    color: colors.textWhite,
    alignSelf: 'center',
    letterSpacing: 0.25,
  },
  textOutlined: {
    fontSize: fontSizes.size16,
    // lineHeight: 24,
    color: colors.textMediumRed,
    alignSelf: 'center',
    letterSpacing: 0.25,
  },
  button: {
    backgroundColor: colors.backgroundMediumRed,
    padding: spacing.sm,
    paddingTop: 0,
    paddingBottom: 0,
    // width: "100%",
    height: 48,
    margin: spacing.sm,
    // alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
  },
  buttonOutlined: {
    backgroundColor: colors.backgroundWhite,
    padding: spacing.sm,
    paddingTop: 0,
    paddingBottom: 0,
    // width: "100%",
    height: 48,
    margin: spacing.sm,
    // alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
    borderWidth: 1,
    borderColor: colors.borderMediumRed,
  },
  buttonIcon: {
    color: colors.iconWhite,
    fontSize: fontSizes.size16,
    alignSelf: 'center',
  },
  buttonIconOutlined: {
    color: colors.iconMediumRed,
    fontSize: fontSizes.size16,
    alignSelf: 'center',
  },
});
export default Button;

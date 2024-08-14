import { StyleSheet, View, Text } from 'react-native';
import { TextInput, TextInputLabelProps } from 'react-native-paper';
import { colors, fontFaces, fontSizes } from '../../styles';

const Input = ({
  leftIcon,
  rightIcon,
  placeHolder,
  value,
  onChange,
  variant,
  disabled,
  floatingLabel,
  onBlur,
  onFocus,
  inputStyle,
  dense,
  multiline,
  numberOfLines,
  showError,
  error,
  secureTextEntry,
}) => {
  return (
    <View>
      <TextInput
        dense={dense}
        label={floatingLabel}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChange}
        mode={variant}
        left={leftIcon}
        right={rightIcon}
        disabled={disabled}
        onBlur={onBlur}
        style={[styles.containerStyle, inputStyle]}
        onFocus={onFocus}
        underlineStyle={styles.underlineStyle}
        activeUnderlineColor={'#00529B'}
        selectionColor={'#00529B'}
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
      />
      {showError ? <Text style={[styles.errorText]}>{error}</Text> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  underlineStyle: {
    borderColor: '#00529B',
  },
  containerStyle: {
    backgroundColor: '#fff',
  },
  errorText: {
    ...fontFaces.regular.normal,
    alignSelf: 'flex-start',
    color: colors.backgroundError,
    fontSize: fontSizes.size11,
    lineHeight: 16,
    marginTop: 8,
  },
});
export default Input;

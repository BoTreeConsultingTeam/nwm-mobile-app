import {StyleSheet, View} from 'react-native';
import {TextInput, TextInputLabelProps} from 'react-native-paper';

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
        style={[style.containerStyle, inputStyle]}
        onFocus={onFocus}
        underlineStyle={style.underlineStyle}
        activeUnderlineColor={'#00529B'}
        selectionColor={'#00529B'}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};
const style = StyleSheet.create({
  underlineStyle: {
    borderColor: '#00529B',
  },
  containerStyle: {
    backgroundColor: '#fff',
  },
});
export default Input;

import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {StyleSheet} from 'react-native';
import {Input, Ripple} from '../index';
import {colors} from '../../styles';
import {formatDate, formatTime} from '../../utility/methods/date';
import DateIcon from '../../assets/icons/date.svg';

const DateTimePicker = ({
  mode,
  value,
  onChange,
  itemStyle,
  error,
  showError,
  viewStyle,
  inputStyle,
  onBlur,
  isRequired,
  disabled,
  minimumDate,
  maximumDate,
  placeholder,
  rippleStyle,
  iconStyle,
}) => {
  const [show, setShow] = useState(false);
  const togglePicker = () => setShow(!show);
  const onValueChange = date => {
    togglePicker();
    onChange(date);
    onBlur && setTimeout(() => onBlur(), 1000);
  };

  const inputValue = mode === 'date' ? formatDate(value) : formatTime(value);
  return (
    <>
      <Ripple
        onPress={togglePicker}
        style={[styles.ripple, rippleStyle]}
        disabled={disabled}
        rippleContainerBorderRadius={0}>
        <Input
          dense={true}
          disabled={disabled}
          viewStyle={viewStyle}
          inputStyle={inputStyle}
          itemStyle={itemStyle}
          placeHolder={placeholder}
          isPassword={false}
          error={error}
          showError={showError}
          value={inputValue}
          isRequired={isRequired}
        />
        <DateIcon style={[styles.dateIcon, iconStyle]} />
      </Ripple>
      {show ? (
        <DateTimePickerModal
          mode={mode}
          value={value || new Date()}
          date={value || new Date()}
          onConfirm={onValueChange}
          onCancel={togglePicker}
          isVisible={show}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  ripple: {
    // position: 'relative',
  },
  dateIcon: {
    position: 'absolute',
    right: 25,
    top: 0,
    marginTop: 15,
    color: colors.iconGray,
  },
});
export default DateTimePicker;

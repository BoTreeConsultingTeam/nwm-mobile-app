import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, DateTimePicker, Input, WithContainer} from '../components';
import {Formik} from 'formik';
import {colors, fontFaces, fontSizes} from '../styles';

const MarkUnavailability = ({navigation}) => {
  return (
    <WithContainer
      pageTitle={'Mark Unavailability'}
      onBackPress={() => navigation.goBack()}
      actions={[]}>
      <View style={styles.main}>
        <Formik>
          {() => {
            return (
              <>
                <View style={styles.dateView}>
                  <View style={styles.dateField}>
                    <Text style={styles.text}>Form</Text>
                    <DateTimePicker
                      placeholder={'Select Date'}
                      inputStyle={styles.dateInputStyle}
                      iconStyle={styles.dateIcon}
                    />
                  </View>
                  <View style={styles.dateField}>
                    <Text style={styles.text}>To</Text>
                    <DateTimePicker
                      placeholder={'Select Date'}
                      inputStyle={styles.dateInputStyle}
                      iconStyle={styles.dateIcon}
                    />
                  </View>
                </View>
                <View style={styles.dateView}>
                  <View style={styles.dateField}>
                    <Text style={styles.text}>Availability</Text>
                    <DateTimePicker
                      placeholder={'Select Date'}
                      inputStyle={styles.dateInputStyle}
                      iconStyle={styles.dateIcon}
                    />
                  </View>
                </View>
                <View style={styles.inputView}>
                  <Text style={styles.text}>Notes</Text>
                  <Input
                    inputStyle={styles.dateInputStyle}
                    // floatingLabel={'Notes'}
                    placeHolder={'Lorem ipsum'}
                    multiline
                    numberOfLines={3}
                  />
                </View>
                <View style={styles.buttonGroup}>
                  <View />
                  <View style={styles.buttonContainer}>
                    <Button text={'Submit'} style={styles.button} />
                    <Button
                      text={'Cancel'}
                      textStyle={styles.clearText}
                      style={styles.button}
                      variant={'outlined'}
                    />
                  </View>
                </View>
                <View style={styles.unavailability}>
                  <Text style={styles.title}>Your Unavailability</Text>
                  <Text style={[styles.text, styles.dateText]}>
                    Dec 24, 2023 - Jan 03, 2024
                  </Text>
                  <Text style={[styles.text, styles.dateText]}>
                    Jan 14, 2024
                  </Text>
                  <Text style={[styles.text, styles.dateText]}>
                    Jan 15, 2024 - Jan 16, 2024
                  </Text>
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  dateView: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 10,
  },
  dateField: {
    paddingRight: 15,
    flex: 1,
    flexDirection: 'column',
  },
  dateInputStyle: {
    paddingHorizontal: 0,
    fontSize: fontSizes.size14,
  },
  dateIcon: {
    right: 0,
    marginTop: 10,
  },
  text: {
    fontSize: fontSizes.size14,
    color: colors.textNormal,
    ...fontFaces.regular.normal,
  },
  inputView: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
  buttonContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 5,
    width: '50%',
  },
  title: {
    color: colors.textNormal,
    ...fontFaces.regular.medium,
    marginBottom: 10,
  },
  dateText: {
    marginBottom: 10,
  },
  clearText: {
    color: colors.primary,
  },
  unavailability: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
export default MarkUnavailability;

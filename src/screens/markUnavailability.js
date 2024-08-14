import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, DateTimePicker, Input, WithContainer } from '../components';
import { Formik } from 'formik';
import { colors, fontFaces, fontSizes } from '../styles';
import { calendarSchema } from '../schema/calendar';
import { useCalendar } from '../hooks/useCalendar';
import moment from 'moment-timezone';
import { ActivityIndicator } from 'react-native-paper';

const MarkUnavailability = ({ navigation }) => {
  const [{ isLoading, calendarList, formikRef }, { handleCalendarUpdateSubmit }] =
    useCalendar();

  return (
    <WithContainer
      pageTitle={'Mark Unavailability'}
      onBackPress={() => navigation.goBack()}
      actions={[]}
      headerStyle={styles.header}>
      <View style={styles.main}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            startDate: null,
            endDate: null,
            notes: null,
          }}
          onSubmit={handleCalendarUpdateSubmit}
          validationSchema={calendarSchema}>
          {({ values, setFieldValue, handleSubmit, touched, errors }) => {
            return (
              <>
                <View style={styles.dateView}>
                  <View style={styles.dateField}>
                    <Text style={styles.text}>Form</Text>
                    <DateTimePicker
                      mode={'date'}
                      placeholder={'Select Date'}
                      value={values.startDate}
                      onChange={e => setFieldValue('startDate', e)}
                      inputStyle={styles.dateInputStyle}
                      iconStyle={styles.dateIcon}
                      error={errors.startDate}
                      showError={errors.startDate && touched.startDate}
                    />
                  </View>
                  <View style={styles.dateField}>
                    <Text style={styles.text}>To</Text>
                    <DateTimePicker
                      mode={'date'}
                      value={values.endDate}
                      placeholder={'Select Date'}
                      onChange={e => setFieldValue('endDate', e)}
                      inputStyle={styles.dateInputStyle}
                      error={errors.endDate}
                      showError={errors.endDate && touched.endDate}
                      iconStyle={styles.dateIcon}
                    />
                  </View>
                </View>
                {/* <View style={styles.dateView}>
                  <View style={styles.dateField}>
                    <Text style={styles.text}>Availability</Text>
                    <DateTimePicker
                      placeholder={'Select Date'}
                      inputStyle={styles.dateInputStyle}
                      iconStyle={styles.dateIcon}
                    />
                  </View>
                </View> */}
                <View style={styles.inputView}>
                  <Text style={styles.text}>Notes</Text>
                  <Input
                    inputStyle={styles.dateInputStyle}
                    // floatingLabel={'Notes'}
                    onChange={e => setFieldValue('notes', e)}
                    placeHolder={'Write notes'}
                    multiline
                    value={values?.notes}
                    error={errors.notes}
                    showError={errors.notes && touched.notes}
                    numberOfLines={3}
                  />
                </View>
                <View style={styles.buttonGroup}>
                  <View />
                  <View style={styles.buttonContainer}>
                    <Button
                      text={'Submit'}
                      onPress={handleSubmit}
                      style={styles.button}
                    />
                    <Button
                      text={'Cancel'}
                      textStyle={styles.clearText}
                      style={styles.button}
                      variant={'outlined'}
                      onPress={() => navigation.goBack()}
                    />
                  </View>
                </View>
                {calendarList.length ? (
                  <View style={styles.unavailability}>
                    <Text style={styles.title}>Your Unavailability</Text>

                    {calendarList.map((item, index) => {
                      return (
                        <Text style={[styles.text, styles.dateText]}>
                          {moment(item.startDate).format('MMM DD, YYYY')} -{' '}
                          {moment(item.endDate).format('MMM DD, YYYY')}
                        </Text>
                      );
                    })}
                  </View>
                ) : isLoading ? (
                  <View style={styles.noContent}>
                    <ActivityIndicator animating color={colors.primary} />
                  </View>
                ) : null}
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
  noContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
  header: {
    backgroundColor: colors.white,
  },
});
export default MarkUnavailability;

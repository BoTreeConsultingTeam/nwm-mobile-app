import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Icon, Modal, Portal, RadioButton } from 'react-native-paper';
import CloseIcon from '../../assets/icons/close.svg';
import { Ripple, DateTimePicker, Button } from '../index';
import { colors, fontSizes, fontFaces } from '../../styles';
const ProjectFilter = ({
  modalOpen,
  closeModal,
  filterValueChange,
  filterValue,
  handleFilterApply,
  clearFilter,
}) => {
  return (
    <Portal>
      <Modal
        theme={{
          colors: { backdrop: 'rgba(255, 255, 255, 0.7)' },
        }}
        visible={modalOpen}
        onDismiss={closeModal}
        style={styles.modal}
        contentContainerStyle={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitle}>
            <Text style={styles.title}>Sort By</Text>
            <Ripple onPress={closeModal} style={styles.closeIcon}>
              <CloseIcon />
            </Ripple>
          </View>
          <RadioButton.Group
            onValueChange={newValue => filterValueChange(newValue, 'sortBy')}
            value={filterValue.sortBy}>
            <View style={styles.radiobutton}>
              <RadioButton value="name" color={colors.primary} />
              <Text style={styles.text}>Project Name</Text>
            </View>
            <View style={styles.radiobutton}>
              <RadioButton value="cityName" color={colors.primary} />
              <Text style={styles.text}>City</Text>
            </View>
            <View style={styles.radiobutton}>
              <RadioButton value="subDivision" color={colors.primary} />
              <Text style={styles.text}>Sub Division</Text>
            </View>
          </RadioButton.Group>
          <View style={styles.filterContainer}>
            <Text style={styles.title}>Filter By</Text>
            <View style={styles.filterType}>
              <Text style={styles.text}>Type</Text>
              <RadioButton.Group
                onValueChange={newValue =>
                  filterValueChange(newValue, 'ProjectType')
                }
                value={filterValue.ProjectType}>
                <View style={styles.filterRadioContainer}>
                  <View style={styles.filterRadio}>
                    <RadioButton value="Commercial" color={colors.primary} />
                    <Text style={styles.text}>Commercial</Text>
                  </View>
                  <View style={styles.filterRadio}>
                    <RadioButton value="Residential" color={colors.primary} />
                    <Text style={styles.text}>Residential</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            {/* <DateTimePicker
              placeholder={'Select Due Date'}
              mode={'date'}
              onChange={e => setDate(e)}
              value={date}
              inputStyle={styles.dateInput}
            /> */}
          </View>
          <View style={styles.buttonGroup}>
            <View />
            <View style={styles.buttonContainer}>
              <Button
                onPress={handleFilterApply}
                text={'Save'}
                style={styles.button}
              />
              <Button
                onPress={clearFilter}
                text={'Clear'}
                textStyle={styles.clearText}
                style={styles.button}
                variant={'outlined'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  text: {
    ...fontFaces.regular.normal,
  },
  modal: {
    position: ' ',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    backgroundColor: '#fff',
    height: Dimensions.get('screen').height - 150,
    paddingTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalContainer: {
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalTitle: {
    borderBottomWidth: 0.3,
    marginBottom: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  title: {
    ...fontFaces.regular.medium,
    fontSize: fontSizes.size16,
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 0,
  },
  radiobutton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  filterContainer: {
    paddingLeft: 20,
    marginTop: 20,
  },
  filterRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterRadioContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 5,
  },
  filterType: {
    marginTop: 15,
  },
  dateInput: {
    paddingRight: 20,
    marginRight: 20,
    paddingBottom: 0,
    marginBottom: 0,
  },
  buttonContainer: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
    width: '45%',
  },
  clearText: {
    color: colors.primary,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    position: 'absolute',
    right: 10,
    bottom: 0,
    width: '100%',
  },
});

export default ProjectFilter;

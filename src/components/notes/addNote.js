import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { colors, fontFaces, fontSizes, spacing } from '../../styles';
import Ripple from '../common/ripple';
import { Formik } from 'formik';
import Input from '../common/input';
import { noteSchema } from '../../schema/note';

const AddNoteModal = ({
  modalOpen,
  closeModal,
  handleNoteSubmit,
  currentTab,
  editNoteData,
  noteAddLoading,
}) => {
  const formikRef = useRef(null);
  const getInitialValue = () => {
    return {
      notes: editNoteData?.note || '',
    };
  };

  const handleClose = () => {
    closeModal(); // Close the modal
    formikRef.current?.resetForm();
  };

  return (
    <Portal>
      <Modal
        dismissable={false}
        visible={modalOpen}
        onDismiss={handleClose}
        style={styles.modal}
        contentContainerStyle={styles.container}>
        <View style={styles.modalContainer}>
          <Formik
            innerRef={formikRef}
            initialValues={getInitialValue()}
            validationSchema={noteSchema}
            onSubmit={(values, action) => {
              action.setSubmitting(true);
              handleNoteSubmit(values, currentTab, action);
            }}>
            {({
              handleSubmit,
              values,
              touched,
              errors,
              setFieldValue,
              isSubmitting,
            }) => (
              <>
                <Text style={styles.text}>
                  {Object.keys(editNoteData).length ? 'Edit' : 'Add'} Note
                </Text>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                  <View style={styles.inputContainer}>
                    <Input
                      inputStyle={styles.inputStyle}
                      placeHolder="Enter your note"
                      multiline
                      numberOfLines={4}
                      name="notes"
                      onChange={text => {
                        setFieldValue('notes', text);
                      }}
                      value={values?.notes}
                      showError={errors.notes && touched.notes}
                      error={errors.notes}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <Ripple
                      rippleContainerBorderRadius={5}
                      onPress={handleClose}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </Ripple>
                    <Ripple
                      rippleContainerBorderRadius={5}
                      disabled={isSubmitting || noteAddLoading}
                      onPress={() => handleSubmit()}>
                      <Text style={styles.buttonText}>
                        {Object.keys(editNoteData).length ? 'Update' : 'Save'}
                      </Text>
                    </Ripple>
                  </View>
                </ScrollView>
              </>
            )}
          </Formik>
        </View>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: spacing.md,
    borderTopRightRadius: spacing.md,
  },
  container: {
    backgroundColor: '#fff',
    paddingTop: 0,
    marginHorizontal: spacing.md,
    borderRadius: spacing.sm,
  },
  modalContainer: {
    margin: spacing.sm,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
    marginTop: 15,
  },
  buttonText: {
    color: colors.primary,
    fontSize: fontSizes.size16,
    ...fontFaces.regular.bold,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
  },
  inputStyle: {
    paddingHorizontal: 0,
    fontSize: fontSizes.size14,
  },
  inputContainer: {
    marginHorizontal: 5,
  },
  text: {
    color: colors.textNormal,
    fontSize: fontSizes.size18,
    ...fontFaces.regular.medium,
    marginLeft: 5,
  },
});
export default AddNoteModal;

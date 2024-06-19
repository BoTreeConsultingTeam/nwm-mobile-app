import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import Ripple from '../common/ripple';
import {colors, fontSizes, fontFaces} from '../../styles';

const ProjectConfirmationModal = ({modalOpen, closeModal}) => {
  return (
    <Portal>
      <Modal
        visible={modalOpen}
        onDismiss={closeModal}
        style={styles.modal}
        contentContainerStyle={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <Text style={styles.confirmText}>
              Submit All Picture for this Project?
            </Text>
            <View style={styles.buttonContainer}>
              <Ripple rippleContainerBorderRadius={5} onPress={closeModal}>
                <Text style={styles.buttonText}>NO</Text>
              </Ripple>
              <Ripple rippleContainerBorderRadius={5} onPress={closeModal}>
                <Text style={styles.buttonText}>YES</Text>
              </Ripple>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  modal: {
    // position: ' ',
    // bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    backgroundColor: '#fff',
    height: 100,
    paddingTop: 0,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  content: {
    margin: 20,
  },
  confirmText: {
    color: colors.textNormal,
    fontSize: fontSizes.size18,
    ...fontFaces.regular.medium,
  },
  buttonText: {
    color: colors.primary,
    fontSize: fontSizes.size16,
    ...fontFaces.regular.bold,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export default ProjectConfirmationModal;

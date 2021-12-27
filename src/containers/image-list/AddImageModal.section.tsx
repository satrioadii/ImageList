import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import Modal from 'react-native-modal';

export interface AddImageModalProps {
  isVisible: boolean;
  onChangeVisibility: Function;
  onLaunchCamera: Function;
  onSelectFromGallery: Function;
}

const AddImageModal: React.FC<AddImageModalProps> = props => {
  const { isVisible, onChangeVisibility, onLaunchCamera, onSelectFromGallery } =
    props;

  const handleHideModal = () => {
    onChangeVisibility(false);
  };

  const handleLaunchCamera = () => {
    onLaunchCamera();
    handleHideModal();
  };

  const handleSelectFromGallery = () => {
    onSelectFromGallery();
    handleHideModal();
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={handleHideModal}
      swipeDirection={['down']}
      onBackdropPress={handleHideModal}
      style={styles.parent}>
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={handleLaunchCamera}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Take from camera</Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={handleSelectFromGallery}>
          <View style={[styles.buttonContainer, styles.marginTop]}>
            <Text style={styles.buttonText}>Select from gallery</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFF',
  },
  parent: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonContainer: {
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  marginTop: {
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default AddImageModal;

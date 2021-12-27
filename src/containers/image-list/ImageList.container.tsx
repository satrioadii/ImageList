import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  SafeAreaView,
  FlatList,
  Button,
  View,
  Text,
  Platform,
} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import uuid from 'react-native-uuid';

import { Container } from 'src/components';
import { FileModel } from 'src/models';

import styles from './ImageList.styles';
import ImageItemSection, { ImageItemSectionProp } from './ImageItem.section';
import AddImageModal from './AddImageModal.section';

const FlatListItem = ({ item }: { item: ImageItemSectionProp }) => (
  <ImageItemSection id={item.id} src={item.src} />
);

const ImageListContainer: React.FC<{}> = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [images, setImages] = useState<ImageItemSectionProp[]>([]);
  const File = useMemo(() => new FileModel(), []);

  const handleAddNewImage = () => {
    handleChangeVisibility(true);
  };

  const handleChangeVisibility = (state: boolean) => {
    setModalIsVisible(state);
  };

  const handleSyncFileInDirectory = useCallback(async () => {
    try {
      const files = await File.onReadAlbumDirectory();
      if (!files.length) {
        return false;
      }

      const fileInDirectory: ImageItemSectionProp[] = [];
      files.forEach(file => {
        if (!file.isFile()) {
          return;
        }

        const imagePath =
          (Platform.OS === 'android' ? 'file://' : '') + file.path;

        fileInDirectory.push({
          id: `${file.name}_${uuid.v4()}`,
          src: imagePath,
        });
      });

      setImages(fileInDirectory);
    } catch (error) {}
  }, [File, setImages]);

  const handleSaveFile = async (asset: Asset) => {
    const currentImages = [...images];
    currentImages.push({
      id: JSON.stringify(asset.id),
      src: asset.uri,
    });

    setImages(currentImages);
    const saveResult = await File.onSaveFile(asset.uri);
    if (!saveResult) {
      return false;
    }
  };

  const handleLaunchCamera = async () => {
    const result: ImagePickerResponse = await launchCamera({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.assets?.length) {
      return;
    }

    handleSaveFile(result.assets[0]);
  };

  const handleLaunchImageLibrary = async () => {
    const result: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.assets?.length) {
      return;
    }

    handleSaveFile(result.assets[0]);
  };

  useEffect(() => {
    handleSyncFileInDirectory();
  }, [handleSyncFileInDirectory]);

  return (
    <SafeAreaView style={styles.parentContainer}>
      {!images.length ? (
        <View style={styles.emptyImageContainer}>
          <Container>
            <Text style={styles.emptyImageText}>No Image Available</Text>
          </Container>
        </View>
      ) : (
        <FlatList
          data={images}
          horizontal={false}
          numColumns={3}
          renderItem={FlatListItem}
          keyExtractor={item => item.id}
          scrollEnabled
        />
      )}

      <View style={styles.buttonContainer}>
        <Button onPress={handleAddNewImage} title="Add New Image" />
      </View>

      <AddImageModal
        isVisible={modalIsVisible}
        onChangeVisibility={handleChangeVisibility}
        onLaunchCamera={handleLaunchCamera}
        onSelectFromGallery={handleLaunchImageLibrary}
      />
    </SafeAreaView>
  );
};

export default ImageListContainer;

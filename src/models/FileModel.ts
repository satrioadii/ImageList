/* eslint-disable curly */
import RNFS from 'react-native-fs';
import moment from 'moment';
import { ReadDirItem } from 'src/types/File.type';

const imagePath = RNFS.PicturesDirectoryPath;
const iBrowsImagePath = `${imagePath}/iBrows`;

class FileModel {
  static imagePath = imagePath;
  static imageAlbumPath = iBrowsImagePath;

  generateCurrentDateTime() {
    return moment(new Date()).format('YYYY[-]MM[-]DD[_]HH[-]mm[-]ss');
  }

  async onReadFileInDir(uri: string) {
    try {
      const result = await RNFS.readDir(uri);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async onReadImageFileWithUri(uri: string) {
    try {
      const result = await RNFS.readFile(uri, 'base64');
      return result;
    } catch (error) {
      return false;
    }
  }

  async onReadAlbumDirectory(): Promise<ReadDirItem[]> {
    try {
      const isAlbumAvailable = await this.onReadAlbumDirectory();
      if (!isAlbumAvailable) throw new Error('Directory not avaiable');

      const result: ReadDirItem[] = await RNFS.readDir(iBrowsImagePath);
      return result;
    } catch (error) {
      return [];
    }
  }

  async makeAlbumDirectory() {
    try {
      await RNFS.mkdir(iBrowsImagePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  async onSaveFile(uri: string | undefined) {
    if (!uri) {
      return false;
    }

    const currentDateTimeString = this.generateCurrentDateTime();
    const isAlbumAvailable = await this.onReadAlbumDirectory();
    if (!isAlbumAvailable) {
      await this.makeAlbumDirectory();
    }

    const base64 = await this.onReadImageFileWithUri(uri);
    if (!base64) {
      return false;
    }

    const fileName = `image_${currentDateTimeString}.jpg`;
    const fileDirectoryName = `${iBrowsImagePath}/${fileName}`;

    try {
      await RNFS.writeFile(fileDirectoryName, base64, 'base64');
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default FileModel;

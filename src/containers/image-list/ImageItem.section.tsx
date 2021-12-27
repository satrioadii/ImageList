import React, { useEffect, useState } from 'react';
import {
  TouchableNativeFeedback,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from 'src/routes/routes.type';

type ImageListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ImageList'
>;

export interface ImageItemSectionProp {
  id: string;
  src: string | undefined;
}

const ImageItemSection: React.FC<ImageItemSectionProp> = React.memo(props => {
  const { src } = props;
  const window = useWindowDimensions();
  const navigation = useNavigation<ImageListNavigationProp>();
  const [imageDimension, setImageDimension] = useState(100);

  useEffect(() => {
    const imgDimension = window.width / 3;
    setImageDimension(imgDimension);
  }, [window]);

  const handleNavigationToImageDetail = () => {
    navigation.push('ImageDetail');
  };

  return (
    <View>
      <TouchableNativeFeedback onPress={handleNavigationToImageDetail}>
        <Image
          style={{ width: imageDimension, height: imageDimension }}
          source={{ uri: src }}
        />
      </TouchableNativeFeedback>
    </View>
  );
});

export default ImageItemSection;

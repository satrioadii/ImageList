import React from 'react';
import { View } from 'react-native';

export interface SpacerComponentProps {
  height?: number | undefined;
  width?: number | undefined;
}

const SpacerComponent: React.FC<SpacerComponentProps> = props => {
  const { height, width } = props;
  return <View style={{ height: height, width: width }} />;
};

export default SpacerComponent;

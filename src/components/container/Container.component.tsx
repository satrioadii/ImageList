import React from 'react';
import { View } from 'react-native';

import containerStyles from './Container.style';

export interface ContainerStyleProps {
  horizontalPadding?: number | undefined;
}

const ContainerComponent: React.FC<ContainerStyleProps> = React.memo(props => {
  const { children, horizontalPadding = undefined } = props;
  const styles = { ...containerStyles };

  if (horizontalPadding) {
    styles.container.paddingLeft = horizontalPadding;
    styles.container.paddingRight = horizontalPadding;
  }

  return <View style={styles.container}>{children}</View>;
});

export default ContainerComponent;

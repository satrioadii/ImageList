import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ImageListContainer, ImageDetailContainer} from 'src/containers';

const Stack = createNativeStackNavigator();

const Routes: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ImageList">
        <Stack.Screen
          name="ImageList"
          component={ImageListContainer}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ImageDetail" component={ImageDetailContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

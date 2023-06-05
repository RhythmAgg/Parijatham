import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './src/navigations/AuthNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
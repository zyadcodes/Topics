// This is the file that is the navigator for the initial onboarding stack
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LaunchScreen from './LaunchScreen/LaunchScreen';
import IntroScreen from './IntroScreen/IntroScreen';

// Creates the navigator
const Stack = createStackNavigator();

// Declares the functional component
const OnboardingStackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName={'LaunchScreen'}
      headerMode={'none'}
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen name={'LaunchScreen'} component={LaunchScreen} />
      <Stack.Screen name={'IntroScreen'} component={IntroScreen} />
    </Stack.Navigator>
  );
};

// Exports the component
export default OnboardingStackNav;

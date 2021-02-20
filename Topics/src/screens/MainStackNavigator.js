// This is the stack navigator that connects all the screen navigators together
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingStackNav from './onboardingScreens/OnboardingStackNav';
import TopicsScreensNav from './topicsScreens/TopicsScreensNav';

// Creates the navigator
const Stack = createStackNavigator();

// Declares the functional component
const MainStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName={'OnboardingScreens'}
        headerMode={'none'}
        screenOptions={{gestureEnabled: false}}>
        <Stack.Screen component={OnboardingStackNav} name={'OnboardingScreens'} />
        <Stack.Screen component={TopicsScreensNav} name={'TopicsScreens'} />
      </Stack.Navigator>
    );
  };
  
  // Exports the component
  export default MainStackNavigator;
// This is going to be the main file that is run when the app is first launched
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import IntroScreen from './src/screens/onboardingScreens/IntroScreen/IntroScreen';
import LaunchScreen from './src/screens/onboardingScreens/LaunchScreen/LaunchScreen'

// Creates the functional component
const App = (props) => {
  // Renders the component
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <IntroScreen />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// Exports the app
export default App;

// This is going to be the main file that is run when the app is first launched
import 'react-native-gesture-handler';
import React, {useRef, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainStackNavigator from './src/screens/MainStackNavigator';
import analytics from '@react-native-firebase/analytics';
import Spinner from 'react-native-spinkit';
import colors from './src/config/colors';
import {sleep} from './src/config/sleep';
import messaging from '@react-native-firebase/messaging';
import Lines from './src/assets/Lines.png';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';

// Creates the functional component
let App = (props) => {
  // Creates references for analytics
  const navigationRef = useRef();
  const routeNameRef = useRef();

  // Sets the loading state as well as the state of the onboarding process as well as the auth state
  const [isFirstAppLaunch, setIsFirstAppLaunch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // This is going to perform the logic for whether or not to show the intro onboarding screens
  useEffect(() => {
    fetchInitialValues();
    // Hides the splash screen
    SplashScreen.hide();
  }, []);

  // Checks if a user is logged in
  const fetchInitialValues = async () => {
    AsyncStorage.clear()
    const isFirstAppLaunch = await AsyncStorage.getItem('isFirstAppLaunch');
    await messaging().requestPermission();
    if (isFirstAppLaunch === 'false') {
      setIsFirstAppLaunch(false);
    } else {
      setIsFirstAppLaunch(true);
      await AsyncStorage.setItem('isFirstAppLaunch', 'false');
    }

    await sleep(1500);
    setIsLoading(false);
  };

  // Renders the loading component
  if (isLoading === true) {
    return (
      <ImageBackground
        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={Lines}>
        <Spinner
          isVisible={true}
          size={100}
          type={'Bounce'}
          color={colors.white}
        />
      </ImageBackground>
    );
  }

  // Renders the component
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
        onStateChange={async (state) => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
        }}>
        <MainStackNavigator isFirstAppLaunch={isFirstAppLaunch} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// Exports the app
App = codePush(App);
export default App;

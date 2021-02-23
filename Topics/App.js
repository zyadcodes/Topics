// This is going to be the main file that is run when the app is first launched
import 'react-native-gesture-handler';
import React, {useRef, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainStackNavigator from './src/screens/MainStackNavigator';
import analytics from '@react-native-firebase/analytics';
import Spinner from 'react-native-spinkit';
import colors from './src/config/colors';
import {sleep} from './src/config/sleep';
import auth from '@react-native-firebase/auth';
import {getUserByID} from './src/config/server';

// Creates the functional component
const App = (props) => {
  // Creates references for analytics
  const navigationRef = useRef();
  const routeNameRef = useRef();

  // Sets the loading state as well as the state of the onboarding process as well as the auth state
  const [isFirstAppLaunch, setIsFirstAppLaunch] = useState('');
  const [isTopicManagerFirstLaunch, setIsTopicManagerFirstLaunch] = useState(
    '',
  );
  const [isLoading, setIsLoading] = useState(true);
  const [userObject, setUserObject] = useState('');
  const [authChecked, setAuthChecked] = useState(false);

  // This is going to perform the logic for whether or not to show the intro onboarding screens
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Checks if a user is logged in
  const onAuthStateChanged = async (user) => {
    if (authChecked === false) {
      if (user) {
        const userObj = await getUserByID(user.uid);
        setUserObject(userObj);
      }
      setAuthChecked(true);
      const isFirstAppLaunch = await AsyncStorage.getItem('isFirstAppLaunch');
      const isTopicManagerFirstLaunch = await AsyncStorage.getItem(
        'isTopicManagerFirstLaunch',
      );
      if (isFirstAppLaunch === 'false') {
        setIsFirstAppLaunch(false);
      } else {
        setIsFirstAppLaunch(true);
        await AsyncStorage.setItem('isFirstAppLaunch', 'false');
      }
      if (isTopicManagerFirstLaunch === 'false') {
        setIsTopicManagerFirstLaunch(false);
      } else {
        setIsTopicManagerFirstLaunch(true);
      }
      await sleep(1500);
      setIsLoading(false);
    }
  };

  // Renders the loading component
  if (isLoading === true) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Spinner
          isVisible={true}
          size={100}
          type={'Bounce'}
          color={colors.lightBlue}
        />
      </View>
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
        <MainStackNavigator
          isFirstAppLaunch={isFirstAppLaunch}
          isTopicManagerFirstLaunch={isTopicManagerFirstLaunch}
          userObject={userObject}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// Exports the app
export default App;

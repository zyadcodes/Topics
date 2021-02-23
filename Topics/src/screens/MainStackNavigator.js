// This is the stack navigator that connects all the screen navigators together
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingStackNav from './onboardingScreens/OnboardingStackNav';
import TopicsScreensNav from './topicsScreens/TopicsScreensNav';
import LogInScreen from './topicsScreens/LogInScreen/LogInScreen';
import ForgotPasswordScreen from './topicsScreens/ForgotPasswordScreen/ForgotPasswordScreen';
import TopicsManagerStackNav from './topicsManagerScreens/TopicsManagerStackNav';

// Creates the navigator
const Stack = createStackNavigator();

// Declares the functional component
const MainStackNavigator = ({
  isFirstAppLaunch,
  isTopicManagerFirstLaunch,
  userObject,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={
        isFirstAppLaunch ? 'OnboardingScreens' : 'TopicsScreens'
      }
      headerMode={'none'}
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen name={'OnboardingScreens'}>
        {(props) => (
          <OnboardingStackNav
            {...props}
            userObject={userObject}
            isTopicManagerFirstLaunch={isTopicManagerFirstLaunch}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={'TopicsScreens'}>
        {(props) => (
          <TopicsScreensNav
            {...props}
            userObject={userObject}
            isTopicManagerFirstLaunch={isTopicManagerFirstLaunch}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={'TopicsManager'}>
        {(props) => (
          <TopicsManagerStackNav
            {...props}
            userObject={userObject}
            isTopicManagerFirstLaunch={isTopicManagerFirstLaunch}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={'LogInScreen'}>
        {(props) => (
          <LogInScreen
            {...props}
            userObject={userObject}
            isTopicManagerFirstLaunch={isTopicManagerFirstLaunch}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={'ForgotPasswordScreen'}>
        {(props) => (
          <ForgotPasswordScreen
            {...props}
            userObject={userObject}
            isTopicManagerFirstLaunch={isTopicManagerFirstLaunch}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// Exports the component
export default MainStackNavigator;

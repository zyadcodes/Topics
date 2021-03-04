// This is the stack navigator that connects all the screen navigators together
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingStackNav from './onboardingScreens/OnboardingStackNav';
import TopicsScreensNav from './topicsScreens/TopicsScreensNav';
import LogInScreen from './topicsScreens/LogInScreen/LogInScreen';
import ForgotPasswordScreen from './topicsScreens/ForgotPasswordScreen/ForgotPasswordScreen';
import TopicsManagerOnboard from './topicsManagerScreens/TopicsManagerOnboard/TopicsManagerOnboard';
import CreateTopicScreen from './topicsManagerScreens/CreateTopicScreen/CreateTopicScreen';
import MyTopicsManagerScreen from './topicsManagerScreens/MyTopicsManagerScreen/MyTopicsManagerScreen';
import TopicManagerMessagesScreen from './topicsManagerScreens/TopicManagerMessagesScreen/TopicManagerMessagesScreen';
import TopicScreen from './topicsScreens/TopicScreen.js/TopicScreen';

// Creates the navigator
const Stack = createStackNavigator();

// Declares the functional component
const MainStackNavigator = ({isFirstAppLaunch}) => {
  return (
    <Stack.Navigator
      initialRouteName={
        isFirstAppLaunch ? 'OnboardingScreens' : 'TopicsScreens'
      }
      headerMode={'none'}
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen name={'OnboardingScreens'} component={OnboardingStackNav} />
      <Stack.Screen name={'TopicsScreens'} component={TopicsScreensNav} />
      <Stack.Screen name={'LogInScreen'} component={LogInScreen} />
      <Stack.Screen name={'TopicScreen'} component={TopicScreen} />
      <Stack.Screen
        name={'ForgotPasswordScreen'}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={'TopicsManageOnboard'}
        component={TopicsManagerOnboard}
      />
      <Stack.Screen name={'CreateTopicScreen'} component={CreateTopicScreen} />
      <Stack.Screen
        name={'MyTopicsManagerScreen'}
        component={MyTopicsManagerScreen}
      />
      <Stack.Screen
        name={'TopicManagerMessagesScreen'}
        component={TopicManagerMessagesScreen}
      />
    </Stack.Navigator>
  );
};

// Exports the component
export default MainStackNavigator;

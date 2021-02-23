// This is the file that is the navigator for the topic manager stack
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TopicsManagerOnboard from './TopicsManagerOnboard/TopicsManagerOnboard';
import CreateTopicScreen from './CreateTopicScreen/CreateTopicScreen';

// Creates the navigator
const Stack = createStackNavigator();

// Declares the functional component
const OnboardingStackNav = ({userObject, isTopicManagerFirstLaunch}) => {
  return (
    <Stack.Navigator
      initialRouteName={
        isTopicManagerFirstLaunch === true
          ? 'TopicsManageOnboard'
          : 'CreateTopicScreen'
      }
      headerMode={'none'}
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen name={'TopicsManageOnboard'}>
        {(props) => <TopicsManagerOnboard {...props} userObject={userObject} />}
      </Stack.Screen>
      <Stack.Screen name={'CreateTopicScreen'}>
        {(props) => <CreateTopicScreen {...props} userObject={userObject} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// Exports the component
export default OnboardingStackNav;

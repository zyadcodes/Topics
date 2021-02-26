// This is the file that is the navigator for the topic manager stack
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TopicsManagerOnboard from './TopicsManagerOnboard/TopicsManagerOnboard';
import CreateTopicScreen from './CreateTopicScreen/CreateTopicScreen';
import MyTopicsManagerScreen from './MyTopicsManagerScreen/MyTopicsManagerScreen';

// Creates the navigator
const Stack = createStackNavigator();

// Declares the functional component
const OnboardingStackNav = ({route}) => {
  return (
    <Stack.Navigator
      initialRouteName={
        route.params.isTopicManagerFirstLaunch === true
          ? 'TopicsManageOnboard'
          : 'MyTopicsManagerScreen'
      }
      headerMode={'none'}
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen name={'TopicsManageOnboard'}>
        {(props) => <TopicsManagerOnboard {...props} route={route} />}
      </Stack.Screen>
      <Stack.Screen name={'CreateTopicScreen'}>
        {(props) => <CreateTopicScreen {...props} route={route} />}
      </Stack.Screen>
      <Stack.Screen name={'MyTopicsManagerScreen'}>
        {(props) => <MyTopicsManagerScreen {...props} route={route} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// Exports the component
export default OnboardingStackNav;

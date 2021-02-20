// This is going to be the navigator for the topics screens which are the main parts of the app
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTopicsScreen from './MyTopicsScreen/MyTopicsScreen';
import ExploreScreen from './ExploreScreen/ExploreScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';

// Creates the tab navigator
const Tab = createBottomTabNavigator();

// Declares the functional component
const TopicsScreensNav = () => {
  return (
    <Tab.Navigator initialRouteName={'MyTopicsScreen'}>
      <Tab.Screen name="MyTopicsScreen" component={MyTopicsScreen} />
      <Tab.Screen name="ExploreScreen" component={ExploreScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Exports the component
export default TopicsScreensNav;

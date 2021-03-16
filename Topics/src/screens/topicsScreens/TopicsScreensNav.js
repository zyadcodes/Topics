// This is going to be the navigator for the topics screens which are the main parts of the app
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExploreScreen from './ExploreScreen/ExploreScreen';
import colors from '../../config/colors';
import {Icon} from 'react-native-elements';
import TopicsScreensNavStyle from './TopicScreensNavStyle';
import {screenHeight} from '../../config/dimensions';

// Creates the tab navigator
const Tab = createBottomTabNavigator();

// Declares the functional component
const TopicsScreensNav = ({navigation, route}) => {
  return (
    <Tab.Navigator
      initialRouteName={
        route.params && route.params.profileScreen ? 'Profile' : 'Explore'
      }
      tabBar={({state, descriptors, navigation}) => {
        const focusedOptions =
          descriptors[state.routes[state.index].key].options;

        if (focusedOptions.tabBarVisible === false) {
          return null;
        }

        return (
          <View />
        );
      }}>
      <Tab.Screen
        name={'Explore'}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
              name="database"
              size={size * 0.6}
              type="font-awesome"
              color={color}
            />
          ),
        }}
        component={ExploreScreen}
      />
    </Tab.Navigator>
  );
};

// Exports the component
export default TopicsScreensNav;

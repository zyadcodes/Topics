// This is going to be the navigator for the topics screens which are the main parts of the app
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTopicsScreen from './MyTopicsScreen/MyTopicsScreen';
import ExploreScreen from './ExploreScreen/ExploreScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import colors from '../../config/colors';
import fontStyles from '../../config/fontStyles';
import strings from '../../config/strings';
import {Icon} from 'react-native-elements';
import {screenHeight} from '../../config/dimensions';

// Creates the tab navigator
const Tab = createBottomTabNavigator();

// Declares the functional component
const TopicsScreensNav = () => {
  return (
    <Tab.Navigator
      initialRouteName={strings.MyTopics}
      tabBarOptions={{
        activeTintColor: colors.darkBlue,
        inactiveTintColor: colors.gray,
        labelStyle: {
          ...fontStyles.subFontStyle,
        },
        style: {
          height: screenHeight * 0.125,
          shadowColor: colors.black,
          shadowOffset: {
            height: -1.5,
          },
          shadowOpacity: 0.5,
        },
      }}>
      <Tab.Screen
        name={'My Topics'}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
              name="comments"
              size={size * 1.5}
              type="font-awesome"
              color={color}
            />
          ),
        }}>
        {(props) => <MyTopicsScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name={'Explore'}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
              name="database"
              size={size * 1.5}
              type="font-awesome"
              color={color}
            />
          ),
        }}>
        {(props) => <ExploreScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name={'Profile'}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon
              name="user"
              size={size * 1.5}
              type="font-awesome"
              color={color}
            />
          ),
        }}>
        {(props) => <ProfileScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

// Exports the component
export default TopicsScreensNav;

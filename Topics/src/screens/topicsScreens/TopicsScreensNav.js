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
          <View style={TopicsScreensNavStyle.tabBarStyle}>
            {state.routes.map((route, index) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              return (
                <TouchableOpacity
                  key={index}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={
                    isFocused
                      ? TopicsScreensNavStyle.touchableCircleSelected
                      : TopicsScreensNavStyle.touchableCircleUnselected
                  }>
                  {options.tabBarIcon({
                    focused: isFocused,
                    color: isFocused ? colors.white : colors.lightGray,
                    size: screenHeight * 0.1,
                  })}
                </TouchableOpacity>
              );
            })}
          </View>
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

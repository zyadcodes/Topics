// This is going to be the tab that contains the explore topics section

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ExploreScreenStyle from './ExploreScreenStyle';
import colors from '../../../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/Logo.png';
import strings from '../../../config/strings';
import {Icon} from 'react-native-elements';
import fontStyles from '../../../config/fontStyles';
import {screenHeight} from '../../../config/dimensions';
import auth from '@react-native-firebase/auth';
import {getUserByID} from '../../../config/server';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-spinkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sleep} from '../../../config/sleep';

// Creates the functional component
const ExploreScreen = ({navigation}) => {
  // Stores the state of the searched item
  const [searchInput, setSearchInput] = useState('');
  const [userObject, setUserObject] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // This is going to perform the logic for whether or not to show the intro onboarding screens
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Checks if a user is logged in
  const onAuthStateChanged = async (user) => {
    if (!user) {
      setUserObject('');
      await sleep(500);
      setIsLoading(false);
    } else {
      fetchUser(user.uid);
    }
  };

  // Fetches the sets the userID
  const fetchUser = async (userID) => {
    const newUserObject = await getUserByID(userID);
    setUserObject(newUserObject);
    await sleep(500);
    setIsLoading(false);
  };

  if (isLoading === true) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={ExploreScreenStyle.container}>
          <AwesomeAlert
            show={isLoading}
            closeOnTouchOutside={false}
            showCancelButton={false}
            showConfirmButton={false}
            customView={
              <Spinner
                isVisible={true}
                size={100}
                type={'Bounce'}
                color={colors.lightBlue}
              />
            }
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  // Renders the screen
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={ExploreScreenStyle.container}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.darkBlue, colors.lightBlue]}
          style={ExploreScreenStyle.blueSection}>
          <View style={ExploreScreenStyle.blueSectionRow}>
            <View style={ExploreScreenStyle.logoContainer}>
              <Image
                resizeMode={'contain'}
                style={ExploreScreenStyle.logoStyle}
                source={Logo}
              />
            </View>
            <TouchableOpacity
              onPress={async () => {
                if (userObject === '') {
                  navigation.navigate('Profile');
                } else {
                  const isTopicManagerFirstLaunch = await AsyncStorage.getItem(
                    'isTopicManagerFirstLaunch',
                  );

                  if (isTopicManagerFirstLaunch === 'false') {
                    navigation.push('MyTopicsManagerScreen', {
                      userObject: userObject,
                    });
                  } else {
                    navigation.push('TopicsManageOnboard', {
                      userObject: userObject,
                    });
                  }
                }
              }}>
              <Text
                style={[
                  fontStyles.mainFontStyle,
                  fontStyles.bold,
                  fontStyles.white,
                  ExploreScreenStyle.topicsManagerStyle,
                ]}>
                {strings.TopicsManager}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={ExploreScreenStyle.searchContainer}>
            <View style={ExploreScreenStyle.searchIcon}>
              <Icon
                name={'search'}
                type={'font-awesome'}
                color={colors.white}
                size={screenHeight * 0.045}
              />
            </View>
            <TextInput
              value={searchInput}
              onChangeText={async (text) => {
                setSearchInput(text);
              }}
              placeholder={strings.SearchAllTopics}
              placeholderTextColor={colors.white}
              style={[
                fontStyles.white,
                fontStyles.mainFontStyle,
                ExploreScreenStyle.textInputStyle,
              ]}
            />
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Exports the component
export default ExploreScreen;

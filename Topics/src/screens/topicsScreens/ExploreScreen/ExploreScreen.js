// This is going to be the tab that contains the explore topics section

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Keyboard,
  ImageBackground,
} from 'react-native';
import ExploreScreenStyle from './ExploreScreenStyle';
import colors from '../../../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/Logo.png';
import strings from '../../../config/strings';
import {Icon} from 'react-native-elements';
import fontStyles from '../../../config/fontStyles';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import auth from '@react-native-firebase/auth';
import {getUserByID, getAllTopics} from '../../../config/server';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-spinkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sleep} from '../../../config/sleep';
import * as Animatable from 'react-native-animatable';
import Lines from '../../../assets/Lines.png';

// Creates the functional component
const ExploreScreen = ({navigation}) => {
  // Stores the state of the searched item
  const [searchInput, setSearchInput] = useState('');
  const [userObject, setUserObject] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setAllTopics] = useState([]);

  // This is going to perform the logic for whether or not to show the intro onboarding screens
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Checks if a user is logged in
  const onAuthStateChanged = async (user) => {
    const allTopicsArray = await getAllTopics();
    setAllTopics(allTopicsArray);
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

  // Renders the loading UI
  if (isLoading === true) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground style={ExploreScreenStyle.container} source={Lines}>
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
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }

  // Renders the screen
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground style={ExploreScreenStyle.container} source={Lines}>
        <View style={ExploreScreenStyle.topRow}>
          <TouchableOpacity
            onPress={async () => {
              if (userObject !== '') {
                const isTopicManagerFirstLaunch = await AsyncStorage.getItem(
                  'isTopicManagerFirstLaunch',
                );
                if (isTopicManagerFirstLaunch === 'false') {
                  navigation.push('MyTopicsManagerScreen', {
                    userObject,
                  });
                } else {
                  navigation.push('TopicsManageOnboard', {
                    userObject,
                  });
                }
              } else {
                navigation.navigate('Profile');
              }
            }}>
            <Text
              style={[
                fontStyles.bigFontStyle,
                fontStyles.white,
                fontStyles.bold,
                {textAlign: 'left'},
              ]}>
              {strings.OTDManager}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              type={'font-awesome'}
              size={screenHeight * 0.05}
              name={'search'}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

// Exports the component
export default ExploreScreen;

// This is going to be the tab that contains the subscribed topics for the user
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
import MyTopicsScreenStyle from './MyTopicsScreenStyle';
import colors from '../../../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/Logo.png';
import strings from '../../../config/strings';
import {Icon} from 'react-native-elements';
import fontStyles from '../../../config/fontStyles';
import {screenHeight} from '../../../config/dimensions';
import auth from '@react-native-firebase/auth';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-spinkit';
import {getUserByID} from '../../../config/server';
import {sleep} from '../../../config/sleep';

// Creates the functional component
const MyTopicsScreen = ({navigation, isTopicManagerFirstLaunch}) => {
  // Stores the state of the searched item & other various state variables
  const [searchInput, setSearchInput] = useState('');
  const [userObject, setUserObject] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
        <View style={MyTopicsScreenStyle.container}>
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
      <View style={MyTopicsScreenStyle.container}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.darkBlue, colors.lightBlue]}
          style={MyTopicsScreenStyle.blueSection}>
          <View style={MyTopicsScreenStyle.blueSectionRow}>
            <View style={MyTopicsScreenStyle.logoContainer}>
              <Image
                resizeMode={'contain'}
                style={MyTopicsScreenStyle.logoStyle}
                source={Logo}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                if (userObject === '') {
                  navigation.navigate('Profile');
                } else {
                  navigation.push('TopicsManager', {
                    isTopicManagerFirstLaunch,
                    userObject,
                  });
                }
              }}>
              <Text
                style={[
                  fontStyles.mainFontStyle,
                  fontStyles.bold,
                  fontStyles.white,
                  MyTopicsScreenStyle.topicsManagerStyle,
                ]}>
                {strings.TopicsManager}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={MyTopicsScreenStyle.searchContainer}>
            <View style={MyTopicsScreenStyle.searchIcon}>
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
              placeholder={strings.SearchMyTopics}
              placeholderTextColor={colors.white}
              style={[
                fontStyles.white,
                fontStyles.mainFontStyle,
                MyTopicsScreenStyle.textInputStyle,
              ]}
            />
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Exports the component
export default MyTopicsScreen;

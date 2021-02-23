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

// Creates the functional component
const MyTopicsScreen = ({navigation, userObject, isTopicManagerFirstLaunch}) => {
  // Stores the state of the searched item & other various state variables
  const [searchInput, setSearchInput] = useState('');
  const [screenUserObject, setScreenUserObject] = useState(userObject);

  // This is going to perform the logic for whether or not to show the intro onboarding screens
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Checks if a user is logged in
  const onAuthStateChanged = async (user) => {
    if (!user) {
      setScreenUserObject('');
    }
  };

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
                if (screenUserObject === '') {
                  navigation.navigate('Profile');
                } else {
                  navigation.push('TopicsManager', {isTopicManagerFirstLaunch});
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

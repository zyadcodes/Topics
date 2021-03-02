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
  FlatList,
} from 'react-native';
import MyTopicsScreenStyle from './MyTopicsScreenStyle';
import colors from '../../../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/Logo.png';
import strings from '../../../config/strings';
import {Icon} from 'react-native-elements';
import fontStyles from '../../../config/fontStyles';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import auth from '@react-native-firebase/auth';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-spinkit';
import {getUserByID, getTopicByID} from '../../../config/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sleep} from '../../../config/sleep';
import TopicsBlueButton from '../../../components/TopicsBlueButton/TopicsBlueButton';
import * as Animatable from 'react-native-animatable';

// Creates the functional component
const MyTopicsScreen = ({navigation}) => {
  // Stores the state of the searched item & other various state variables
  const [searchInput, setSearchInput] = useState('');
  const [userObject, setUserObject] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [subscribedTopics, setSubscribedTopics] = useState([]);

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
    // One line solution to fetch all promises
    const allUserTopicObjects = await Promise.all(
      newUserObject.subscribedTopics.map((eachTopicID) =>
        getTopicByID(eachTopicID),
      ),
    );
    setSubscribedTopics(allUserTopicObjects);
    await sleep(500);
    setIsLoading(false);
  };

  // Renders the loadingUI
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

  // Renders the UI when the user doesn't have any subscribed topics
  if (userObject.subscribedTopics.length === 0) {
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
          <View style={MyTopicsScreenStyle.joinTopicContainer}>
            <Image
              source={Logo}
              resizeMode={'contain'}
              style={MyTopicsScreenStyle.bigLogoStyle}
            />
            <TopicsBlueButton
              text={strings.JoinATopic}
              onPress={() => navigation.navigate('Explore')}
              height={screenHeight * 0.065}
              width={screenWidth * 0.75}
              fontSize={fontStyles.bigFontStyle}
            />
          </View>
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
        <FlatList
          data={subscribedTopics}
          keyExtractor={(eachItem) => eachItem.topicID}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <Animatable.View
                style={MyTopicsScreenStyle.topicContainer}
                animation={'bounceInUp'}>
                <TouchableOpacity onPress={() => {}}>
                  <View style={MyTopicsScreenStyle.topicProfileContainer}>
                    <Image
                      source={{
                        uri: 'data:image/png;base64,' + item.profileImage,
                      }}
                      resizeMode={'contain'}
                      style={MyTopicsScreenStyle.topicProfile}
                    />
                  </View>
                  <View style={MyTopicsScreenStyle.verticalSpacer} />
                  <Text
                    style={[
                      fontStyles.black,
                      fontStyles.bold,
                      fontStyles.mainFontStyle,
                      {textAlign: 'center'},
                    ]}>
                    {item.topicName}
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            );
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

// Exports the component
export default MyTopicsScreen;

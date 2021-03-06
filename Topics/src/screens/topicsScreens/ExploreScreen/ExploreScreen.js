// This is going to be the tab that contains the explore topics section

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Keyboard,
  ImageBackground,
  LogBox,
} from 'react-native';
import SearchBar from 'react-native-searchbar';
import ExploreScreenStyle from './ExploreScreenStyle';
import colors from '../../../config/colors';
import strings from '../../../config/strings';
import {Icon} from 'react-native-elements';
import fontStyles from '../../../config/fontStyles';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import auth from '@react-native-firebase/auth';
import {
  getUserByID,
  getAllTopics,
  addUserDocListener,
  logEvent,
} from '../../../config/server';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-spinkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sleep} from '../../../config/sleep';
import Lines from '../../../assets/Lines.png';
import * as Animatable from 'react-native-animatable';

// Creates the functional component
const ExploreScreen = ({navigation}) => {
  LogBox.ignoreLogs(['Warning: componentWillMount']);

  // Stores the state of the searched item
  const [userObject, setUserObject] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(false);
  const [topics, setAllTopics] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchedInput, setSearchedInput] = useState('');

  // This is going to perform the logic for whether or not to show the intro onboarding screens
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // The reference for the searchBarRef
  const searchBarRef = useRef();

  // Checks if a user is logged in
  const onAuthStateChanged = async (user) => {
    const allTopicsArray = await getAllTopics();
    setAllTopics(allTopicsArray);
    if (!user) {
      setUserObject('');
      await sleep(500);
      setIsLoading(false);
    } else {
      logEvent('LoggedInAppOpen', {});
      fetchUser(user.uid);
    }
  };

  // Fetches the sets the userID
  const fetchUser = async (userID) => {
    const newUserObject = await getUserByID(userID);
    setUserObject(newUserObject);
    addUserDocListener(newUserObject.userID, async (docSnapshot) => {
      const allTopics = await getAllTopics();
      setAllTopics(allTopics);
      setUserObject(docSnapshot.docs[0]._data);
    });
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
      <View style={{flex: 1}}>
        <ImageBackground style={ExploreScreenStyle.container} source={Lines}>
          <SearchBar
            ref={searchBarRef}
            handleSearch={(input) => {
              if (input.trim() === '') {
                setSearchResults([]);
                setShowSearchResults(false);
              } else {
                setSearchedInput(input);
                const searchedTopics = topics.filter((eachTopic) =>
                  eachTopic.topicName.includes(input),
                );
                setSearchResults(searchedTopics);
                setShowSearchResults(true);
              }
            }}
            placeholder={strings.SearchAllTopics}
            placeholderTextColor={colors.black}
            fontFamily={fontStyles.midFontStyle.fontFamily}
            fontSize={fontStyles.midFontStyle.fontSize}
            textColor={colors.black}
            clearOnHide={false}
            hideBack={true}
            hideX={true}
            heightAdjust={screenHeight * 0.09}
            onBlur={() => {
              logEvent('SearchCompleted', {searchedTerm: searchedInput});
              searchBarRef.current.hide();
            }}
          />
          <View style={ExploreScreenStyle.topRow}>
            {userObject.userID === 'ObXHfZoWaIZRrbwp5mu9SeCgTvf1' ? (
              <TouchableOpacity
                onPress={async () => {
                  logEvent('OTDManagerClicked', {});
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
            ) : (
              <View />
            )}
            <TouchableOpacity
              onPress={() => {
                logEvent('SearchClicked', {});
                searchBarRef.current.show();
              }}>
              <Icon
                type={'font-awesome'}
                size={screenHeight * 0.05}
                name={'search'}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
          <View style={ExploreScreenStyle.topicsListContainer}>
            <FlatList
              extraData={showSearchResults}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={showSearchResults ? searchResults : topics}
              keyExtractor={(eachItem) => eachItem.topicID}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <Animatable.View
                    style={ExploreScreenStyle.topicContainer}
                    animation={'bounceInUp'}>
                    <TouchableOpacity
                      onPress={() => {
                        if (userObject !== '') {
                          logEvent('TopicClicked', {loggedIn: true});
                          navigation.push('TopicScreen', {
                            topic: item,
                            userObject: userObject,
                          });
                        } else {
                          logEvent('TopicClicked', {loggedIn: false});
                          navigation.navigate('Profile');
                        }
                      }}>
                      <Image
                        source={item.profileImage}
                        resizeMode={'contain'}
                        style={ExploreScreenStyle.topicProfile}
                      />
                    </TouchableOpacity>
                  </Animatable.View>
                );
              }}
            />
          </View>
          <AwesomeAlert
            show={isReloading}
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
      </View>
    </TouchableWithoutFeedback>
  );
};

// Exports the component
export default ExploreScreen;

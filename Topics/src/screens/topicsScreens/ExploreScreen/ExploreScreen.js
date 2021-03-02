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

// Creates the functional component
const ExploreScreen = ({navigation}) => {
  // Stores the state of the searched item
  const [searchInput, setSearchInput] = useState('');
  const [userObject, setUserObject] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [trendingTopics, setAllTrendingTopics] = useState([]);
  const [topicsForYou, setAllTopicsForYou] = useState([]);

  // This is going to perform the logic for whether or not to show the intro onboarding screens
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Checks if a user is logged in
  const onAuthStateChanged = async (user) => {
    const allTopicsArray = await getAllTopics();
    setAllTrendingTopics(allTopicsArray);
    setAllTopicsForYou(allTopicsArray);

    if (!user) {
      setUserObject('');
      await sleep(500);
      setIsLoading(false);
    } else {
      fetchUser(user.uid, allTopicsArray);
    }
  };

  // Fetches the sets the userID
  const fetchUser = async (userID, allTopicsArray) => {
    const newUserObject = await getUserByID(userID);
    setUserObject(newUserObject);
    // Removes ones the user is already subscribed to from the for you array if they are logged in
    let topicsForYouArray = allTopicsArray;
    topicsForYouArray = topicsForYouArray.filter(
      (eachElement) =>
        !newUserObject.subscribedTopics.includes(eachElement.topicID),
    );
    setAllTopicsForYou(topicsForYouArray);
    await sleep(500);
    setIsLoading(false);
  };

  // Renders the loading UI
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
        <View style={ExploreScreenStyle.topicsContainer}>
          <Text
            style={[
              ExploreScreenStyle.leftPadding,
              fontStyles.black,
              fontStyles.bigFontStyle,
              fontStyles.bold,
            ]}>
            {strings.TopTrendingTopics}
          </Text>
          <View style={ExploreScreenStyle.verticalSpacer} />
          <FlatList
            data={trendingTopics}
            horizontal={true}
            style={ExploreScreenStyle.leftPadding}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(eachItem) => eachItem.topicID}
            renderItem={({item}) => {
              return (
                <Animatable.View
                  style={ExploreScreenStyle.topicContainer}
                  animation={'bounceInRight'}>
                  <TouchableOpacity onPress={() => {}}>
                    <View style={ExploreScreenStyle.topicProfileContainer}>
                      <Image
                        source={{
                          uri: 'data:image/png;base64,' + item.profileImage,
                        }}
                        resizeMode={'contain'}
                        style={ExploreScreenStyle.topicProfile}
                      />
                    </View>
                    <View style={ExploreScreenStyle.verticalSpacer} />
                    <Text
                      style={[
                        fontStyles.black,
                        fontStyles.bold,
                        fontStyles.midFontStyle,
                        {textAlign: 'center'},
                      ]}>
                      {item.topicName}
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
              );
            }}
          />
          {topicsForYou.length > 0 ? (
            <View>
              <View style={ExploreScreenStyle.verticalSpacer} />
              <Text
                style={[
                  ExploreScreenStyle.leftPadding,
                  fontStyles.black,
                  fontStyles.bigFontStyle,
                  fontStyles.bold,
                ]}>
                {strings.OurTopTopicsForYou}
              </Text>
              <View style={ExploreScreenStyle.verticalSpacer} />
              <FlatList
                data={topicsForYou}
                horizontal={true}
                style={ExploreScreenStyle.leftPadding}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(eachItem) => eachItem.topicID}
                renderItem={({item}) => {
                  return (
                    <Animatable.View
                      style={ExploreScreenStyle.topicContainer}
                      animation={'bounceInRight'}
                      delay={250}>
                      <TouchableOpacity onPress={() => {}}>
                        <View style={ExploreScreenStyle.topicProfileContainer}>
                          <Image
                            source={{
                              uri: 'data:image/png;base64,' + item.profileImage,
                            }}
                            resizeMode={'contain'}
                            style={ExploreScreenStyle.topicProfile}
                          />
                        </View>
                        <View style={ExploreScreenStyle.verticalSpacer} />
                        <Text
                          style={[
                            fontStyles.black,
                            fontStyles.bold,
                            fontStyles.midFontStyle,
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
          ) : (
            <View />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Exports the component
export default ExploreScreen;

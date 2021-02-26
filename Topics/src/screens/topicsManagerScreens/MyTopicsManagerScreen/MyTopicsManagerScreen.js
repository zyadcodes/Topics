// This is going to be the screen where the user's created topics will be available. This is going
// to allow the user to view their topics and access other data
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import MyTopicsManagerScreenStyle from './MyTopicsManagerScreenStyle';
import {Icon} from 'react-native-elements';
import fontStyles from '../../../config/fontStyles';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import strings from '../../../config/strings';
import colors from '../../../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/Logo.png';
import TopicsBlueButton from '../../../components/TopicsBlueButton/TopicsBlueButton';
import Spinner from 'react-native-spinkit';
import {sleep} from '../../../config/sleep';
import AwesomeAlert from 'react-native-awesome-alerts';
import {getTopicByID} from '../../../config/server';

// Creates the functional component
const MyTopicsManagerScreen = ({navigation, route}) => {
  // Stores the state of the searched item & other various state variables
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userTopics, setUserTopics] = useState([]);
  const [userObject, setUserObject] = useState(route.params.userObject)

  // The useEffect method will fetch the user's created topic object if there are any and store them as an
  // array
  useEffect(() => {
    setInitialUserState();
  }, []);

  // Helper method for the useEffect method
  const setInitialUserState = async () => {
    console.log(userObject);
    if (userObject.createdTopics.length === 0) {
      await sleep(500);
      setIsLoading(false);
    } else {
      // One line solution to fetch all promises
      const allUserTopicObjects = await Promise.all(
        userObject.createdTopics.map((eachTopicID) =>
          getTopicByID(eachTopicID),
        ),
      );
      setUserTopics(allUserTopicObjects);
      await sleep(500);
      setIsLoading(false);
    }
  };

  // Renders the component
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={MyTopicsManagerScreenStyle.container}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.darkBlue, colors.lightBlue]}
          style={MyTopicsManagerScreenStyle.blueSection}>
          <View style={MyTopicsManagerScreenStyle.blueSectionRow}>
            <TouchableOpacity
              style={MyTopicsManagerScreenStyle.backButtonContainer}
              onPress={() => navigation.goBack()}>
              <Icon
                type={'font-awesome'}
                name={'angle-left'}
                size={screenHeight * 0.05}
                color={colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.push('CreateTopicScreen', {userObject});
              }}>
              <Text
                style={[
                  fontStyles.mainFontStyle,
                  fontStyles.bold,
                  fontStyles.white,
                  MyTopicsManagerScreenStyle.createNewTopic,
                ]}>
                {strings.CreateNewTopic}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={MyTopicsManagerScreenStyle.searchContainer}>
            <View style={MyTopicsManagerScreenStyle.searchIcon}>
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
                MyTopicsManagerScreenStyle.textInputStyle,
              ]}
            />
          </View>
        </LinearGradient>
        {isLoading === true ? (
          <View />
        ) : userTopics.length === 0 ? (
          <View style={MyTopicsManagerScreenStyle.createTopicContainer}>
            <Image
              source={Logo}
              resizeMode={'contain'}
              style={MyTopicsManagerScreenStyle.logoStyle}
            />
            <TopicsBlueButton
              text={strings.CreateTopic}
              onPress={() => navigation.push('CreateTopicScreen', {userObject})}
              height={screenHeight * 0.065}
              width={screenWidth * 0.75}
              fontSize={fontStyles.bigFontStyle}
            />
          </View>
        ) : (
          <View style={MyTopicsManagerScreenStyle.topicsListContainer}>
            <FlatList
              data={userTopics}
              keyExtractor={(eachItem) => eachItem.topicID}
              numColumns={2}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={MyTopicsManagerScreenStyle.topicContainer}>
                  <Image
                    source={{uri: item.profileImage}}
                    resizeMode={'contain'}
                    style={MyTopicsManagerScreenStyle.topicProfile}
                  />
                  <Text
                    style={[
                      fontStyles.black,
                      fontStyles.bold,
                      fontStyles.mainFontStyle,
                    ]}>
                    {item.topicName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

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
};

// Exports the component
export default MyTopicsManagerScreen;

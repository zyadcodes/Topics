// This is the screen where the user will be able to create a topic
import React, {useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Image,
} from 'react-native';
import colors from '../../../config/colors';
import strings from '../../../config/strings';
import fontStyles from '../../../config/fontStyles';
import {Icon} from 'react-native-elements';
import CreateTopicScreenStyle from './CreateTopicScreenStyle';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import TopicsWhiteButton from '../../../components/TopicsWhiteButton/TopicsWhiteButton';
import ImagePicker from 'react-native-image-crop-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-spinkit';
import {createTopic, getUserByID, saveTopic} from '../../../config/server';
import {sleep} from '../../../config/sleep';

// Creates the functional component
const CreateTopicScreen = ({navigation, route}) => {
  const {userObject, isEditing, topic} = route.params;

  // Stores the state variables for all of the inputs
  const [topicName, setTopicName] = useState(isEditing ? topic.topicName : '');
  const [topicSubname, setTopicSubname] = useState(
    isEditing ? topic.topicSubname : '',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // This is going to attempt to create a topic assuming all the fields
  // have been filled out
  const createTopicMethod = async () => {
    // Tests to check all fields have been filled out
    if (topicName.trim() === '') {
      setErrorMessage(strings.PleaseEnterTopicInfo);
      setErrorVisible(true);
    } else {
      setIsLoading(true);

      if (isEditing) {
        await saveTopic(topicName.trim(), topicSubname.trim(), topic.topicID);
      } else {
        await createTopic(
          topicName.trim(),
          topicSubname.trim(),
          userObject.userID,
        );
      }

      const newUserObject = await getUserByID(userObject.userID);
      await sleep(500);
      setIsLoading(false);
      await sleep(500);
      navigation.replace('MyTopicsManagerScreen', {
        userObject: newUserObject,
      });
    }
  };

  // Renders the component
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={CreateTopicScreenStyle.container}>
          <TouchableOpacity
            style={CreateTopicScreenStyle.backButtonContainer}
            onPress={() => navigation.goBack()}>
            <Icon
              type={'font-awesome'}
              name={'angle-left'}
              size={screenHeight * 0.05}
              color={colors.white}
            />
          </TouchableOpacity>
          <View style={CreateTopicScreenStyle.topBlueSection}></View>
          <View style={CreateTopicScreenStyle.rowContainer}>
            <TextInput
              value={topicName}
              onChangeText={(newText) => setTopicName(newText)}
              placeholder={strings.TopicNameDotDotDot}
              placeholderTextColor={colors.gray}
              style={[
                fontStyles.black,
                fontStyles.midFontStyle,
                CreateTopicScreenStyle.topicNameInput,
              ]}
            />
          </View>
          <View style={CreateTopicScreenStyle.rowContainer}>
            <TextInput
              value={topicSubname}
              onChangeText={(newText) => setTopicSubname(newText)}
              placeholder={strings.TopicSubname}
              placeholderTextColor={colors.gray}
              style={[
                fontStyles.black,
                fontStyles.midFontStyle,
                CreateTopicScreenStyle.topicDescriptionInput,
              ]}
            />
          </View>
          {isEditing ? (
            <View style={CreateTopicScreenStyle.followersTextContainer}>
              <Text style={[fontStyles.black, fontStyles.bigFontStyle]}>
                {topic.followers === 1
                  ? topic.followers + ' ' + strings.Follower
                  : topic.followers + ' ' + strings.Followers}
              </Text>
            </View>
          ) : (
            <View />
          )}
          <View style={CreateTopicScreenStyle.blueButtonContainer}>
            <TopicsWhiteButton
              text={isEditing ? strings.Save : strings.CreateTopic}
              onPress={() => {
                createTopicMethod();
              }}
              height={screenHeight * 0.065}
              width={screenWidth * 0.75}
              fontSize={fontStyles.bigFontStyle}
            />
          </View>
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
          <AwesomeAlert
            show={errorVisible}
            title={strings.Whoops}
            message={errorMessage}
            closeOnTouchOutside={true}
            showCancelButton={false}
            showConfirmButton={true}
            titleStyle={[
              fontStyles.mainFontStyle,
              fontStyles.gray,
              {textAlign: 'center'},
            ]}
            messageStyle={[
              fontStyles.subFontStyle,
              fontStyles.gray,
              {textAlign: 'center'},
            ]}
            confirmButtonTextStyle={[
              fontStyles.subFontStyle,
              fontStyles.white,
              {textAlign: 'center'},
            ]}
            confirmText={strings.Ok}
            confirmButtonColor={colors.darkBlue}
            onConfirmPressed={() => {
              setErrorVisible(false);
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Exports the component
export default CreateTopicScreen;

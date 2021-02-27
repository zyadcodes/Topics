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
import TopicsBlueButton from '../../../components/TopicsBlueButton/TopicsBlueButton';
import ImagePicker from 'react-native-image-crop-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-spinkit';
import {createTopic, getUserByID} from '../../../config/server';
import {sleep} from '../../../config/sleep';

// Creates the functional component
const CreateTopicScreen = ({navigation, route}) => {
  // Stores the state variables for all of the inputs
  const [userID, setUserObject] = useState(route.params.userID);
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [topicName, setTopicName] = useState('');
  const [tags, setTags] = useState(['topic']);
  const [newTag, setNewTag] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [updateScreen, setUpdateScreen] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // This is going to attempt to create a topic assuming all the fields
  // have been filled out
  const createTopicMethod = async () => {
    // Tests to check all fields have been filled out
    if (coverImage === '' || profileImage === '') {
      setErrorMessage(strings.PleaseEnterTopicImages);
      setErrorVisible(true);
    } else if (topicName.trim() === '' || topicDescription.trim() === '') {
      setErrorMessage(strings.PleaseEnterTopicInfo);
      setErrorVisible(true);
    } else {
      setIsLoading(true);
      await createTopic(
        topicName,
        topicDescription,
        coverImage,
        profileImage,
        tags,
        userID,
      );
      const newUserObject = await getUserByID(userID);
      await sleep(500);
      setIsLoading(false);
      await sleep(500);
      navigation.replace('TopicsManager', {
        userObject: newUserObject,
        isTopicManagerFirstLaunch: false,
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
          <TouchableOpacity
            style={[
              CreateTopicScreenStyle.coverPictureContainer,
              CreateTopicScreenStyle.grayBackground,
            ]}
            onPress={async () => {
              try {
                const image = await ImagePicker.openPicker({
                  cropping: true,
                  width: 828,
                  height: 464,
                });
                setCoverImage(image.path);
              } catch (error) {}
            }}>
            {coverImage === '' ? (
              <Icon
                size={screenHeight * 0.13}
                color={colors.black}
                type={'font-awesome'}
                name={'camera'}
                style={{
                  marginTop: screenHeight * 0.05,
                }}
              />
            ) : (
              <Image
                source={{uri: coverImage}}
                style={CreateTopicScreenStyle.coverPicture}
                resizeMode={'contain'}
              />
            )}
          </TouchableOpacity>
          <View style={CreateTopicScreenStyle.rowContainer}>
            <TouchableOpacity
              style={[
                CreateTopicScreenStyle.profPictureContainer,
                CreateTopicScreenStyle.grayBackground,
              ]}
              onPress={async () => {
                try {
                  const image = await ImagePicker.openPicker({
                    cropping: true,
                    height: 215,
                    width: 215,
                    cropperCircleOverlay: true,
                  });
                  setProfileImage(image.path);
                } catch (error) {}
              }}>
              {profileImage === '' ? (
                <Icon
                  size={screenHeight * 0.06}
                  color={colors.black}
                  type={'font-awesome'}
                  name={'camera'}
                />
              ) : (
                <Image
                  source={{uri: profileImage}}
                  style={CreateTopicScreenStyle.profPicture}
                  resizeMode={'contain'}
                />
              )}
            </TouchableOpacity>
            <TextInput
              value={topicName}
              maxLength={13}
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
          <View style={CreateTopicScreenStyle.tagsContainer}>
            {tags.map((eachTag) => (
              <View key={eachTag} style={CreateTopicScreenStyle.tag}>
                <Text style={[fontStyles.white, fontStyles.midFontStyle]}>
                  #{eachTag}
                </Text>
                <View style={CreateTopicScreenStyle.horizontalSpacer} />
                <TouchableOpacity
                  onPress={() => {
                    const newArray = tags;
                    newArray.splice(newArray.indexOf(eachTag), 1);
                    setTags(newArray);
                    setUpdateScreen(!updateScreen);
                  }}>
                  <Icon
                    color={colors.white}
                    size={screenHeight * 0.0225}
                    type={'font-awesome'}
                    name={'trash'}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <TextInput
              style={[
                CreateTopicScreenStyle.tag,
                fontStyles.white,
                fontStyles.midFontStyle,
              ]}
              value={newTag}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(newText) => setNewTag(newText)}
              placeholder={strings.AddTag}
              placeholderTextColor={colors.white}
              onEndEditing={() => {
                const newArray = tags;
                newArray.push(newTag);
                setTags(newArray);
                setNewTag('');
              }}
            />
          </View>
          <TextInput
            value={topicDescription}
            onChangeText={(newText) => setTopicDescription(newText)}
            placeholder={strings.TopicDescription}
            maxLength={42}
            placeholderTextColor={colors.gray}
            style={[
              fontStyles.black,
              fontStyles.midFontStyle,
              CreateTopicScreenStyle.topicDescriptionInput,
            ]}
          />
          <View style={CreateTopicScreenStyle.blueButtonContainer}>
            <TopicsBlueButton
              text={strings.CreateTopic}
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

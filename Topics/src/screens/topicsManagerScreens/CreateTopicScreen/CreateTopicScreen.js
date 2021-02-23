// This is the screen where the user will be able to create a topic
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import colors from '../../../config/colors';
import strings from '../../../config/strings';
import fontStyles from '../../../config/fontStyles';
import {Icon} from 'react-native-elements';
import CreateTopicScreenStyle from './CreateTopicScreenStyle';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import TopicsBlueButton from '../../../components/TopicsBlueButton/TopicsBlueButton';

// Creates the functional component
const CreateTopicScreen = ({navigation, userObject}) => {
  // Stores the state variables for all of the inputs
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [topicName, setTopicName] = useState('');
  const [tags, setTags] = useState(['topic']);
  const [newTag, setNewTag] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [updateScreen, setUpdateScreen] = useState(false);

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
            ]}>
            <Icon
              size={screenHeight * 0.13}
              color={colors.black}
              type={'font-awesome'}
              name={'camera'}
            />
          </TouchableOpacity>
          <View style={CreateTopicScreenStyle.rowContainer}>
            <TouchableOpacity
              style={[
                CreateTopicScreenStyle.profPictureContainer,
                CreateTopicScreenStyle.grayBackground,
              ]}>
              <Icon
                size={screenHeight * 0.06}
                color={colors.black}
                type={'font-awesome'}
                name={'camera'}
              />
            </TouchableOpacity>
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
              onPress={() => {}}
              height={screenHeight * 0.065}
              width={screenWidth * 0.75}
              fontSize={fontStyles.bigFontStyle}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Exports the component
export default CreateTopicScreen;

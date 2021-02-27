// This is the screen where topic managers will be able to message their users
import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import TopicManagerMessagesScreenStyle from './TopicManagerMessagesScreenStyle';
import {Icon} from 'react-native-elements';
import colors from '../../../config/colors';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import strings from '../../../config/strings';
import fontStyles from '../../../config/fontStyles';
import {
  GiftedChat,
  Send,
  InputToolbar,
  Composer,
} from 'react-native-gifted-chat';

// Creates the component
const TopicManagerMessagesScreen = ({navigation, route}) => {
  // Fetches the route params
  const {userID, topic} = route.params;

  // Creates the chat ref
  const chatRef = useRef();

  // Contains the current state of the messages
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // This method is going to handle the sending and displaying of topic messages
  const sendMessage = (message) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
  };

  // Renders the UI of the screen
  return (
    <View style={TopicManagerMessagesScreenStyle.container}>
      <View style={TopicManagerMessagesScreenStyle.iconRow}>
        <TouchableOpacity
          style={TopicManagerMessagesScreenStyle.iconContainer}
          onPress={() => navigation.goBack()}>
          <Icon
            type={'font-awesome'}
            name={'angle-left'}
            size={screenHeight * 0.06}
            color={colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={TopicManagerMessagesScreenStyle.iconContainer}
          onPress={() => navigation.goBack()}>
          <Icon
            type={'font-awesome'}
            name={'gears'}
            size={screenHeight * 0.0375}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={TopicManagerMessagesScreenStyle.coverPictureContainer}>
        <Image
          source={{uri: 'data:image/png;base64,' + topic.coverImage}}
          style={TopicManagerMessagesScreenStyle.coverPicture}
          resizeMode={'cover'}
        />
      </View>
      <View style={TopicManagerMessagesScreenStyle.topicInfo}>
        <Text
          style={[
            fontStyles.white,
            fontStyles.bold,
            fontStyles.biggerFontStyle,
          ]}>
          {topic.topicName}
        </Text>
        <Text
          style={[fontStyles.white, fontStyles.bold, fontStyles.bigFontStyle]}>
          {topic.subscribers === 1
            ? topic.subscribers + ' ' + strings.Subscriber
            : topic.subscribers + ' ' + strings.Subscribers}
        </Text>
      </View>
      <GiftedChat
        ref={chatRef}
        messages={messages}
        placeholder={strings.SendYourTopicAMessage}
        onSend={(messages) => sendMessage(messages)}
        textInputStyle={[fontStyles.black, fontStyles.subFontStyle]}
        maxComposerHeight={screenHeight * 0.01}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

// Exports the screen
export default TopicManagerMessagesScreen;

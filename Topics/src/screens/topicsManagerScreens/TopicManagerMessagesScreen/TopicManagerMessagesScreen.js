// This is the screen where topic managers will be able to message their users
import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import TopicManagerMessagesScreenStyle from './TopicManagerMessagesScreenStyle';
import {Icon} from 'react-native-elements';
import colors from '../../../config/colors';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import strings from '../../../config/strings';
import fontStyles from '../../../config/fontStyles';
import {GiftedChat} from 'react-native-gifted-chat';
import {sendMessage, loadTopicMessages} from '../../../config/server';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-spinkit';
import TopicsBlueButton from '../../../components/TopicsBlueButton/TopicsBlueButton';

// Creates the component
const TopicManagerMessagesScreen = ({navigation, route}) => {
  // Fetches the route params
  const {userID, topic} = route.params;

  // Contains the current state of the messages
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [allMessagesLoaded, setAllMessagesLoaded] = useState(false);

  // This is going to load the initial messages
  useEffect(() => {
    fetchMostRecentMessages(new Date());
  }, []);

  // Fetches messages by date and sets them to the state
  const fetchMostRecentMessages = async (date) => {
    const messagesFetched = await loadTopicMessages(topic.topicID, date);
    let newMessages = messages.concat(messagesFetched);
    if (messagesFetched.length === 0) {
      setAllMessagesLoaded(true);
    }
    setMessages(newMessages);
    setIsMessagesLoading(false);
    setIsLoading(false);
  };

  // This method is going to handle the sending and displaying of topic messages
  const sendMessageFunction = async (message) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
    await sendMessage(topic.topicName, topic.topicID, message[0]);
  };

  if (isLoading === true) {
    return (
      <View style={TopicManagerMessagesScreenStyle.container}>
        <AwesomeAlert
          show={true}
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
    );
  }

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
        messages={messages}
        infiniteScroll={true}
        loadEarlier={true}
        renderLoadEarlier={(props) =>
          messages.length === 0 || allMessagesLoaded === true ? (
            <View />
          ) : (
            <View style={TopicManagerMessagesScreenStyle.renderEarlierStyle}>
              {isMessagesLoading === true ? (
                <Spinner
                  isVisible={true}
                  size={25}
                  type={'Bounce'}
                  color={colors.lightBlue}
                />
              ) : (
                <TopicsBlueButton
                  text={strings.LoadEarlier}
                  onPress={() => {
                    setIsMessagesLoading(true);
                    fetchMostRecentMessages(
                      messages[messages.length - 1].createdAt,
                    );
                  }}
                  height={screenHeight * 0.065}
                  width={screenWidth * 0.4}
                  fontSize={fontStyles.midFontStyle}
                />
              )}
            </View>
          )
        }
        placeholder={strings.SendYourTopicAMessage}
        onSend={(messages) => sendMessageFunction(messages)}
        textInputStyle={[fontStyles.black, fontStyles.subFontStyle]}
        maxComposerHeight={screenHeight * 0.01}
        user={{
          _id: userID,
        }}
      />
    </View>
  );
};

// Exports the screen
export default TopicManagerMessagesScreen;

// This is the scrollable screen that will be used to display specific topic messages
import React, {useEffect, useState} from 'react';
import {View, ImageBackground, TouchableOpacity, Text} from 'react-native';
import Wavy from '../../../assets/Wavy.png';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import TopicScreenStyle from './TopicScreenStyle';
import {Icon} from 'react-native-elements';
import colors from '../../../config/colors';
import Swiper from 'react-native-swiper';
import {loadTopicMessages} from '../../../config/server';
import fontStyles from '../../../config/fontStyles';
import strings from '../../../config/strings';
import TopicsWhiteButton from '../../../components/TopicsWhiteButton/TopicsWhiteButton';
import {followTopic, unfollowTopic} from '../../../config/server';

// Creates the functional component
const TopicScreen = ({navigation, route}) => {
  // Fetches the route params
  const {topic, userObject} = route.params;

  // This is going to hold the current state of the messages so that loading doesn't take a while
  const [messages, setMessages] = useState([topic.mostRecentMessage]);
  const [updateScreen, setUpdateScreen] = useState(true);
  const [numFollowers, setNumFollowers] = useState(topic.followers);
  const [isFollowing, setIsFollowing] = useState(
    userObject.followingTopics.includes(topic.topicID),
  );

  // Renders the last month's worth of messages
  useEffect(() => {
    asyncUseEffect();
  }, []);

  // This is a helper method for the useEffect method
  const asyncUseEffect = async () => {
    let loadedMessages = await loadTopicMessages(
      topic.topicID,
      topic.mostRecentMessage.createdAt,
      31,
    );
    setMessages(
      [
        {
          ...topic.mostRecentMessage,
          createdAt: topic.mostRecentMessage.createdAt.toDate(),
        },
      ].concat(loadedMessages),
    );
    setUpdateScreen(!updateScreen);
  };

  // This method is going to follow this specific topic
  const followTopicFunction = async () => {
    setNumFollowers(numFollowers + 1);
    setIsFollowing(true);
    await followTopic(userObject.userID, topic.topicID);
  };

  // This method is going to unfollow the user from this specific topic
  const unfollowTopicFunction = async () => {
    setNumFollowers(numFollowers - 1);
    setIsFollowing(false);
    await unfollowTopic(userObject.userID, topic.topicID);
  };

  // Renders the UI
  return (
    <ImageBackground source={Wavy} style={TopicScreenStyle.container}>
      <TouchableOpacity
        style={TopicScreenStyle.backButtonContainer}
        onPress={() => navigation.goBack()}>
        <Icon
          type={'font-awesome'}
          name={'angle-left'}
          size={screenHeight * 0.05}
          color={colors.lightBlue}
        />
      </TouchableOpacity>
      <Swiper
        key={messages.length}
        horizontal={false}
        loop={false}
        showsPagination={false}
        bounces={true}
        loadMinimalSize={5}>
        {messages.map((eachMessage) => {
          return (
            <View
              style={[TopicScreenStyle.messageContainer]}
              key={eachMessage._id}>
              <Text
                style={[
                  fontStyles.white,
                  fontStyles.biggerFontStyle,
                  fontStyles.bold,
                  {textAlign: 'center'},
                ]}>
                {eachMessage.text}
              </Text>
            </View>
          );
        })}
      </Swiper>
      <View style={TopicScreenStyle.bottomFollowSection}>
        <Text
          style={[
            fontStyles.mainFontStyle,
            fontStyles.white,
            fontStyles.bold,
            {
              textAlign: 'center',
            },
          ]}>
          {topic.topicSubname}
        </Text>
        <Text
          style={[
            fontStyles.mainFontStyle,
            fontStyles.white,
            fontStyles.bold,
            {
              textAlign: 'center',
            },
          ]}>
          {numFollowers === 1
            ? numFollowers + ' ' + strings.Follower
            : numFollowers + ' ' + strings.Followers}
        </Text>
        {isFollowing ? (
          <TopicsWhiteButton
            onPress={() => {
              unfollowTopicFunction();
            }}
            height={screenHeight * 0.065}
            width={screenWidth * 0.5}
            text={strings.Following}
            fontSize={fontStyles.bigFontStyle}
          />
        ) : (
          <TouchableOpacity
            style={TopicScreenStyle.followButton}
            onPress={() => followTopicFunction()}>
            <Icon
              type={'font-awesome'}
              name={'plus'}
              size={screenHeight * 0.05}
              color={colors.lightBlue}
            />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

// This is going to export the component
export default TopicScreen;

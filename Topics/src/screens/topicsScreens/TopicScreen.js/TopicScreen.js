// This is the scrollable screen that will be used to display specific topic messages
import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import Wavy from '../../../assets/Wavy.png';
import {screenHeight} from '../../../config/dimensions';
import TopicScreenStyle from './TopicScreenStyle';
import {Icon} from 'react-native-elements';
import colors from '../../../config/colors';
import Swiper from 'react-native-swiper';
import {loadTopicMessages} from '../../../config/server';
import fontStyles from '../../../config/fontStyles';

// Creates the functional component
const TopicScreen = ({navigation, route}) => {
  // Fetches the route params
  const {topic, userID} = route.params;

  // This is going to hold the current state of the messages so that loading doesn't take a while
  const [messages, setMessages] = useState([topic.mostRecentMessage]);
  const [updateScreen, setUpdateScreen] = useState(true);

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
                ]}>
                {eachMessage.text}
              </Text>
            </View>
          );
        })}
      </Swiper>
    </ImageBackground>
  );
};

// This is going to export the component
export default TopicScreen;

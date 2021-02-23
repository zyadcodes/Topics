// This is going to be the screen where the user will be presented with an onboard to the topic creator
import React, {useEffect} from 'react';
import {View, Text, Image, Animated} from 'react-native';
import strings from '../../../config/strings';
import OnboardingSS4 from '../../../assets/OnboardingSS4.png';
import TopicsWhiteButton from '../../../components/TopicsWhiteButton/TopicsWhiteButton';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import fontStyles from '../../../config/fontStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopicsManagerOnboardStyle from './TopicsManagerOnboardStyle';

// Creates the functional component
const TopicsManagerOnboard = ({navigation, userObject}) => {
  let position = new Animated.ValueXY({
    x: 0,
    y: screenHeight * 0.1,
  });

  let opacity = new Animated.Value(0);

  useEffect(() => {
    AsyncStorage.setItem('isTopicManagerFirstLaunch', 'false');
    // Starts the animation for the positioning & the opacity
    Animated.spring(position, {
      overshootClamping: true,
      mass: 20,
      toValue: {
        x: 0,
        y: screenHeight * 0,
      },
      useNativeDriver: false,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, []);

  // Renders the component
  return (
    <View style={TopicsManagerOnboardStyle.container}>
      <Animated.View style={[position.getLayout(), {opacity}]}>
        <Text
          style={[
            fontStyles.white,
            fontStyles.biggerFontStyle,
            fontStyles.bold,
            TopicsManagerOnboardStyle.titleText,
          ]}>
          {strings.CreateYourFirstTopic}
        </Text>
        <Text
          style={[
            fontStyles.white,
            fontStyles.mainFontStyle,
            fontStyles.bold,
            TopicsManagerOnboardStyle.subTitleText,
          ]}>
          {strings.ShareYourMessagesWithTheWorld}
        </Text>
        <Image
          source={OnboardingSS4}
          style={TopicsManagerOnboardStyle.imageStyle}
          resizeMode={'contain'}
        />
        <View style={TopicsManagerOnboardStyle.buttonContainer}>
          <TopicsWhiteButton
            onPress={() => {navigation.push('CreateTopicScreen', {userObject})}}
            height={screenHeight * 0.065}
            width={screenWidth * 0.55}
            text={strings.LetsGo}
            fontSize={fontStyles.bigFontStyle}
          />
        </View>
      </Animated.View>
    </View>
  );
};

// Exports the component
export default TopicsManagerOnboard;

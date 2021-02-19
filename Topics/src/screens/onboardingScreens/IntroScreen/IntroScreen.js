// This is going to be the screen that onboards the user by tellin them some basics about the app the first time
// they open it
import React, {useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import strings from '../../../config/strings';
import OnboardingSS1 from '../../../assets/OnboardingSS1.png';
import OnboardingSS2 from '../../../assets/OnboardingSS2.png';
import OnboardingSS3 from '../../../assets/OnboardingSS3.png';
import TopicsWhiteButton from '../../../components/TopicsWhiteButton/TopicsWhiteButton';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import fontStyles from '../../../config/fontStyles';
import IntroScreenStyle from './IntroScreenStyle';

// Creates the functional component
const IntroScreen = (props) => {
  // Controls the current state of the screen to test which screen is being currently shown
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  // This function is going to return a component based on the current screen being shown that will
  // be the current onboarding step
  const getOnboardingComponent = (text, screenshot, isFinal) => {
    return (
      <View>
        <Text
          style={[
            fontStyles.white,
            fontStyles.biggerFontStyle,
            fontStyles.bold,
            IntroScreenStyle.titleText,
          ]}>
          {text}
        </Text>
        <Image
          source={screenshot}
          style={IntroScreenStyle.imageStyle}
          resizeMode={'contain'}
        />
      </View>
    );
  };

  // Renders the screen
  return (
    <ScrollView
      style={IntroScreenStyle.container}
      horizontal={true}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      pagingEnabled={true}>
      <View style={IntroScreenStyle.onboardingContainer}>
        {getOnboardingComponent(
          strings.ExploreTopicsYouLove,
          OnboardingSS1,
          false,
        )}
      </View>
      <View style={IntroScreenStyle.onboardingContainer}>
        {getOnboardingComponent(
          strings.SubscribeToYourFavorites,
          OnboardingSS2,
          false,
        )}
      </View>
      <View style={IntroScreenStyle.onboardingContainer}>
        {getOnboardingComponent(strings.StartYourOwn, OnboardingSS3, true)}
      </View>
    </ScrollView>
  );
};

// Exports the component
export default IntroScreen;

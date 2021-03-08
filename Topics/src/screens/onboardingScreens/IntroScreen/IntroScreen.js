// This is going to be the screen that onboards the user by tellin them some basics about the app the first time
// they open it
import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import strings from '../../../config/strings';
import OnboardingSS1 from '../../../assets/OnboardingSS1.png';
import OnboardingSS2 from '../../../assets/OnboardingSS2.png';
import OnboardingSS3 from '../../../assets/OnboardingSS3.png';
import TopicsWhiteButton from '../../../components/TopicsWhiteButton/TopicsWhiteButton';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import fontStyles from '../../../config/fontStyles';
import IntroScreenStyle from './IntroScreenStyle';
import Lines from '../../../assets/Lines.png';
import {logEvent} from '../../../config/server';

// Creates the functional component
const IntroScreen = ({navigation}) => {
  const scrollViewRef = useRef();

  // This function is going to return a component based on the current screen being shown that will
  // be the current onboarding step
  const getOnboardingComponent = (text, screenshot, currentIndex) => {
    return (
      <ImageBackground style={IntroScreenStyle.container} source={Lines}>
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
            resizeMode={'cover'}
          />

          <View style={IntroScreenStyle.buttonContainer}>
            <TopicsWhiteButton
              onPress={() => {
                if (currentIndex === 2) {
                  logEvent('onboardingCompleted', {});
                  navigation.push('TopicsScreens', {profileScreen: false});
                } else {
                  scrollViewRef.current.scrollTo({
                    x: screenWidth * (currentIndex + 1),
                    animated: true,
                  });
                }
              }}
              height={screenHeight * 0.065}
              width={screenWidth * 0.5}
              text={currentIndex === 2 ? strings.Go : strings.Next}
              fontSize={fontStyles.bigFontStyle}
            />
          </View>
          <View style={IntroScreenStyle.onboardingRow}>
            <View style={IntroScreenStyle.threeDots}>
              <TouchableOpacity
                onPress={() =>
                  scrollViewRef.current.scrollTo({x: 0, animated: true})
                }
                style={
                  currentIndex === 0
                    ? IntroScreenStyle.selectedDot
                    : IntroScreenStyle.unselectedDot
                }
              />
              <TouchableOpacity
                onPress={() =>
                  scrollViewRef.current.scrollTo({
                    x: screenWidth,
                    animated: true,
                  })
                }
                style={
                  currentIndex === 1
                    ? IntroScreenStyle.selectedDot
                    : IntroScreenStyle.unselectedDot
                }
              />
              <TouchableOpacity
                onPress={() =>
                  scrollViewRef.current.scrollTo({
                    x: screenWidth * 2,
                    animated: true,
                  })
                }
                style={
                  currentIndex === 2
                    ? IntroScreenStyle.selectedDot
                    : IntroScreenStyle.unselectedDot
                }
              />
            </View>
            {currentIndex < 2 ? (
              <TouchableOpacity
                onPress={() => {
                  logEvent('onboardingSkipped', {});
                  navigation.push('TopicsScreens', {profileScreen: false});
                }}>
                <Text
                  style={[
                    fontStyles.white,
                    fontStyles.mainFontStyle,
                    fontStyles.white,
                  ]}>
                  {strings.Skip}
                </Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        </View>
      </ImageBackground>
    );
  };

  // Renders the screen
  return (
    <View style={IntroScreenStyle.container}>
      <ScrollView
        horizontal={true}
        ref={scrollViewRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}>
        <View style={IntroScreenStyle.onboardingContainer}>
          {getOnboardingComponent(
            strings.ExploreTopicsYouLove,
            OnboardingSS1,
            0,
          )}
        </View>
        <View style={IntroScreenStyle.onboardingContainer}>
          {getOnboardingComponent(
            strings.SubscribeToYourFavorites,
            OnboardingSS2,
            1,
          )}
        </View>
        <View style={IntroScreenStyle.onboardingContainer}>
          {getOnboardingComponent(strings.GetDailyMessages, OnboardingSS3, 2)}
        </View>
      </ScrollView>
    </View>
  );
};

// Exports the component
export default IntroScreen;

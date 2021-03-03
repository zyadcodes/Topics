// This screen will be the initial screen that is accessed when the app is launched for the first time
import React, {useEffect} from 'react';
import {View, Animated, ImageBackground} from 'react-native';
import strings from '../../../config/strings';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import fontStyles from '../../../config/fontStyles';
import LaunchScreenStyle from './LaunchScreenStyle';
import Logo from '../../../assets/Logo.png';
import TopicsWhiteButton from '../../../components/TopicsWhiteButton/TopicsWhiteButton';
import Lines from '../../../assets/Lines.png';

// Creates the functional component
const LaunchScreen = ({navigation}) => {
  // Creates the animation states
  let currentImagePos = new Animated.ValueXY({
    x: 0,
    y: screenHeight * 0.6,
  });
  let currentImageWidth = new Animated.Value(screenWidth * 0.1);
  let currentOpacity = new Animated.Value(0);

  // Starts the animation that will be rendered when the screen is launched
  useEffect(() => {
    // Starts the animation for the image positioning
    Animated.spring(currentImagePos, {
      overshootClamping: true,
      mass: 100,
      delay: 200,
      toValue: {
        x: 0,
        y: screenHeight * 0.1,
      },
      useNativeDriver: false,
    }).start();

    // Starts the animation for the image zoom
    Animated.timing(currentImageWidth, {
      toValue: screenWidth * 0.5,
      duration: 1200,
      delay: 200,
      useNativeDriver: false,
    }).start();

    // Starts the animation for the opacity for the button and the text
    Animated.timing(currentOpacity, {
      toValue: 1,
      duration: 1000,
      delay: 1500,
      useNativeDriver: false,
    }).start();
  }, []);

  // Renders the component
  return (
    <ImageBackground style={LaunchScreenStyle.container} source={Lines}>
      <Animated.View style={currentImagePos.getLayout()}>
        <Animated.Image
          source={Logo}
          style={[{width: currentImageWidth}, LaunchScreenStyle.logoStyle]}
          resizeMode={'contain'}
        />
      </Animated.View>
      <Animated.Text
        style={[
          fontStyles.darkBlue,
          fontStyles.hugeFontStyle,
          fontStyles.white,
          LaunchScreenStyle.textContainer,
          {opacity: currentOpacity},
        ]}>
        {strings.OfTheDay}
      </Animated.Text>
      <Animated.View
        style={[LaunchScreenStyle.buttonContainer, {opacity: currentOpacity}]}>
        <TopicsWhiteButton
          text={strings.LetsGo}
          onPress={() => {
            navigation.push('IntroScreen');
          }}
          height={screenHeight * 0.065}
          width={screenWidth * 0.75}
          fontSize={fontStyles.bigFontStyle}
        />
      </Animated.View>
    </ImageBackground>
  );
};

// Exports the functional component
export default LaunchScreen;

// This is going to be the StyleSheet for the onboarding for the topics manager
import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import colors from '../../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue
  },
  onboardingContainer: {
    alignItems: 'center',
    height: screenHeight,
    width: screenWidth,
    paddingHorizontal: screenWidth * 0.025,
    backgroundColor: colors.darkBlue,
  },
  titleText: {
    marginTop: screenHeight * 0.1,
    textAlign: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
  },
  subTitleText: {
    marginTop: screenHeight * 0.025,
    textAlign: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
  },
  imageStyle: {
    marginTop: screenHeight * -0.035,
    zIndex: -1,
    height: screenHeight * 0.55,
    maxWidth: screenWidth,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: screenHeight * -0.035,
  },
});

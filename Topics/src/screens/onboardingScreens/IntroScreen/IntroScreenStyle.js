// This is going to contain the StyleSheet for the intro screen
import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import colors from '../../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  onboardingContainer: {
    alignItems: 'center',
    height: screenHeight,
    width: screenWidth,
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
  imageStyle: {
      height: screenHeight * 0.55
  }
});

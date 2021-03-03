// This is going to contain the StyleSheet for the intro screen
import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import colors from '../../../config/colors';

export default StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
  },
  onboardingContainer: {
    alignItems: 'center',
    height: screenHeight,
    width: screenWidth,
    maxWidth: screenWidth,
    zIndex: 2,
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
  imageStyle: {
    height: screenHeight * 0.55,
    maxWidth: screenWidth,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  onboardingRow: {
    marginTop: screenHeight * 0.05,
    flexDirection: 'row',
    width: screenWidth * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  threeDots: {
    flexDirection: 'row',
    width: screenWidth * 0.2,
    justifyContent: 'space-between',
  },
  selectedDot: {
    height: screenHeight * 0.02,
    width: screenHeight * 0.02,
    borderRadius: screenHeight * 0.02,
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 1,
  },
  unselectedDot: {
    height: screenHeight * 0.02,
    width: screenHeight * 0.02,
    borderRadius: screenHeight * 0.02,
    borderColor: colors.white,
    borderWidth: 1,
  },
});

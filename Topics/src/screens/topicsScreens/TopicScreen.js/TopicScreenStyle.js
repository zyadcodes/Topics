// This is going to be the StyleSheet for the TopicScreen
import {StyleSheet} from 'react-native';
import colors from '../../../config/colors';
import {screenHeight, screenWidth} from '../../../config/dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    position: 'absolute',
    top: screenHeight * 0.075,
    left: screenWidth * 0.05,
    backgroundColor: colors.white,
    height: screenHeight * 0.05,
    width: screenHeight * 0.05,
    borderRadius: screenHeight * 0.025,
    paddingRight: screenHeight * 0.005,
    zIndex: 1,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
  },
  messageContainer: {
    height: screenHeight,
    width: screenWidth * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
  },
  bottomFollowSection: {
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: screenHeight * 0.2,
    width: screenWidth * 0.58,
    bottom: screenHeight * 0.06,
    alignSelf: 'center',
  },
  followButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: screenHeight * 0.065,
    width: screenHeight * 0.065,
    borderRadius: screenHeight * 0.0325,
    zIndex: 1,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
  },
});

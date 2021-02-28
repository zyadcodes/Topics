// This is going to contain the Stylesheet for the topic manager messages screen
import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import colors from '../../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  iconContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.lightBlue,
    height: screenHeight * 0.06,
    width: screenHeight * 0.06,
    borderRadius: screenHeight * 0.03,
    paddingRight: screenHeight * 0.005,
    marginTop: screenHeight * 0.0125,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: screenWidth * 0.9,
    zIndex: 1,
    position: 'absolute',
    top: screenHeight * 0.05,
  },
  topicInfo: {
    zIndex: 1,
    position: 'absolute',
    top: screenHeight * 0.175,
    left: screenWidth * 0.025,
    height: screenHeight * 0.06,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  coverPictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    height: screenHeight * 0.3,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
  },
  coverPicture: {
    width: screenWidth,
    height: screenHeight * 0.3,
  },
  sendContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.lightBlue,
    height: screenHeight * 0.05,
    width: screenHeight * 0.05,
    borderRadius: screenHeight * 0.025,
    paddingLeft: screenHeight * 0.005,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
    marginRight: screenWidth * 0.025,
  },
  renderEarlierStyle: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: screenHeight * 0.01
  }
});


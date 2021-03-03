// This is the StyleSheet for the CreateTopicScreen
import {StyleSheet} from 'react-native';
import colors from '../../../config/colors';
import {screenHeight, screenWidth} from '../../../config/dimensions';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
    backgroundColor: colors.lightBlue,
    height: screenHeight * 0.05,
    width: screenHeight * 0.05,
    borderRadius: screenHeight * 0.025,
    paddingRight: screenHeight * 0.005,
    zIndex: 1,
    position: 'absolute',
    left: screenWidth * 0.05,
    top: screenHeight * 0.075,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
  },
  topBlueSection: {
    width: screenWidth,
    height: screenHeight * 0.26,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
    backgroundColor: colors.lightBlue,
  },
  grayBackground: {
    backgroundColor: colors.lightGray,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: screenWidth * 0.85,
    marginTop: screenHeight * 0.03,
  },
  profPictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenHeight * 0.12,
    borderRadius: screenHeight * 0.06,
    height: screenHeight * 0.12,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
  },
  profPicture: {
    width: screenHeight * 0.12,
    borderRadius: screenHeight * 0.06,
    height: screenHeight * 0.12,
  },
  topicNameInput: {
    width: screenWidth * 0.5,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    borderBottomWidth: 2,
    paddingBottom: screenHeight * 0.01,
  },
  tagsContainer: {
    marginTop: screenHeight * 0.03,
    flexDirection: 'row',
    alignSelf: 'center',
    width: screenWidth * 0.9,
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    height: screenHeight * 0.05,
    paddingHorizontal: screenWidth * 0.025,
    backgroundColor: colors.lightBlue,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginRight: screenWidth * 0.02,
    borderRadius: screenHeight * 0.025,
    marginBottom: screenHeight * 0.01,
  },
  horizontalSpacer: {
    width: screenWidth * 0.025,
  },
  topicDescriptionInput: {
    width: screenWidth * 0.75,
    marginTop: screenHeight * 0.075,
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    borderBottomWidth: 2,
    paddingBottom: screenHeight * 0.01,
  },
  blueButtonContainer: {
    marginTop: screenHeight * 0.15,
  },
  followersTextContainer: {
    textAlign: 'center',
    marginTop: screenHeight * 0.025,
  },
});

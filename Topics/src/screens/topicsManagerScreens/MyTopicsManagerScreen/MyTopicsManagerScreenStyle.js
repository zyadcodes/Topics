// This is going to be the StyleSheet for the my topics screen
import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import colors from '../../../config/colors';

export default StyleSheet.create({
  backButtonContainer: {
    alignSelf: 'flex-start',
    backgroundColor: colors.lightBlue,
    height: screenHeight * 0.05,
    width: screenHeight * 0.05,
    borderRadius: screenHeight * 0.025,
    paddingRight: screenHeight * 0.005,
    marginTop: screenHeight * 0.0125,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  createTopicContainer: {
    width: screenWidth,
    height: screenHeight * 0.65,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.white,
  },
  blueSection: {
    width: screenWidth,
    height: screenHeight * 0.245,
  },
  logoStyle: {
    height: screenHeight * 0.25,
  },
  blueSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: screenHeight * 0.05,
    width: screenWidth * 0.9,
  },
  createNewTopic: {
    textAlign: 'right',
  },
  searchContainer: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.07,
    marginTop: screenHeight * 0.025,
    borderRadius: screenHeight * 0.025,
    backgroundColor: colors.mediumBlue,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  searchIcon: {
    marginLeft: screenWidth * 0.03,
    marginRight: screenWidth * 0.03,
  },
  textInputStyle: {
    width: screenWidth * 0.7,
  },
  topicsListContainer: {
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: screenHeight * 0.755,
  },
  topicContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: screenHeight * 0.035,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
    marginLeft: screenWidth * 0.0666
  },
  topicProfile: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    borderRadius: screenWidth * 0.08,
  },
});

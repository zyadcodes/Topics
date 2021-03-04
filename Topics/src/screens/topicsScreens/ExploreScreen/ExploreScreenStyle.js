// This is going to be the StyleSheet for the my explore screen
import {StyleSheet} from 'react-native';
import colors from '../../../config/colors';
import {screenWidth, screenHeight} from '../../../config/dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topRow: {
    flexDirection: 'row',
    width: screenWidth * 0.9,
    marginTop: screenHeight * 0.075,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topicContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: screenHeight * 0.015,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
    marginLeft: screenWidth * 0.0666,
    paddingVertical: screenHeight * 0.01,
  },
  topicProfile: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    borderRadius: screenWidth * 0.08,
  },
  topicsListContainer: {
    marginTop: screenHeight * 0.025,
    minHeight: screenHeight * 0.8,
  },
  inputContainer: {
    width: screenWidth * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
    paddingBottom: screenHeight * 0.01,
    marginBottom: screenHeight * 0.035,
  },
  textInput: {
    width: screenWidth * 0.65,
    alignItems: 'center',
  },
});

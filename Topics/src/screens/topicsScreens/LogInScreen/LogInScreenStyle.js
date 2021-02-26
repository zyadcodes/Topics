// This is going to be the StyleSheet for the LogIn Screen
import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import colors from '../../../config/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
    marginTop: screenHeight * 0.075,
    marginLeft: screenWidth * 0.05,
    backgroundColor: colors.lightBlue,
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
  textContainer: {
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
    textAlign: 'center',
    marginTop: screenHeight * -0.025,
  },
  logoStyle: {
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
    width: screenWidth * 0.35,
  },
  logoTitleContainer: {
    width: screenWidth,
    alignItems: 'center',
    marginBottom: screenHeight * 0.05,
    marginTop: screenHeight * -0.075,
  },
  inputContainer: {
    width: screenWidth * 0.8,
    paddingHorizontal: screenWidth * 0.025,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.gray,
    borderBottomWidth: 2,
    paddingBottom: screenHeight * 0.01,
    marginBottom: screenHeight * 0.075,
  },
  textInput: {
    width: screenWidth * 0.65,
    alignItems: 'center',
    marginLeft: screenWidth * 0.05,
  },
  forgotPasswordStyle: {
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: screenHeight * 0.05,
  },
});

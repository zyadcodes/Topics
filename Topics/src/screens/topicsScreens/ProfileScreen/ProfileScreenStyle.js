// This is going to be the StyleSheet for the profile screen
import {StyleSheet} from 'react-native';
import colors from '../../../config/colors';
import {screenHeight, screenWidth} from '../../../config/dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logoStyle: {
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
  },
  logoTitleContainer: {
    width: screenWidth,
    alignItems: 'center',
    marginBottom: screenHeight * 0.05,
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
  inputViewContainer: {
    width: screenWidth,
    alignItems: 'center',
  },
  inputContainer: {
    width: screenWidth * 0.8,
    paddingHorizontal: screenWidth * 0.025,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.gray,
    borderBottomWidth: 2,
    paddingBottom: screenHeight * 0.01,
    marginBottom: screenHeight * 0.035,
  },
  textInput: {
    width: screenWidth * 0.65,
    alignItems: 'center',
    marginLeft: screenWidth * 0.05,
  },
  phoneNumberInput: {
    width: screenWidth * 0.8,
    alignItems: 'center',
    marginLeft: screenWidth * -0.05,
  },
  termsAndConditionsRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth * 0.8,
  },
  buttonContainer: {
    marginVertical: screenHeight * 0.025,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueSection: {
    width: screenWidth,
    height: screenHeight * 0.245,
    marginBottom: screenHeight * 0.025,
  },
  blueSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: screenHeight * 0.05,
    width: screenWidth * 0.9,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenHeight * 0.075,
    height: screenHeight * 0.075,
    borderRadius: screenHeight * 0.0375,
    backgroundColor: colors.white,
  },
  myAccountLogoStyle: {
    width: screenHeight * 0.05,
    height: screenHeight * 0.05,
  },
  topicsManagerStyle: {
    textAlign: 'right',
  },
  myAccountStyle: {
    textAlign: 'left',
    marginLeft: screenWidth * 0.05,
    marginTop: screenHeight * 0.015,
  },
  linkRow: {
    flexDirection: 'row',
    width: screenWidth * 0.9,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: screenHeight * 0.025,
    height: screenHeight * 0.05
  },
  iconStyle: {
    backgroundColor: colors.lightBlue,
    height: screenHeight * 0.05,
    width: screenHeight * 0.05,
    borderRadius: screenHeight * 0.025,
    paddingLeft: screenHeight * 0.005,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signOutButton: {
    alignSelf: 'flex-end',
    marginRight: screenWidth * 0.05,
    marginTop: screenHeight * 0.11
  }
});

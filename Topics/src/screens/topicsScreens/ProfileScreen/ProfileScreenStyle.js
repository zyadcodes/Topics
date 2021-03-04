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
    marginTop: screenHeight * -0.045,
  },
  myAccountTextStyle: {
    textAlign: 'left',
    marginTop: screenHeight * 0.075,
    marginLeft: screenWidth * 0.05,
    alignSelf: 'flex-start',
    marginBottom: screenHeight * 0.075,
  },
  inputViewContainer: {
    width: screenWidth,
    alignItems: 'center',
  },
  inputContainer: {
    width: screenWidth * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
    paddingBottom: screenHeight * 0.01,
    zIndex: 1,
    position: 'absolute'
  },
  textInput: {
    width: screenWidth * 0.65,
    alignItems: 'center',
  },
  phoneNumberInput: {
    width: screenWidth * 0.8,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  termsAndConditionsRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth * 0.8,
    marginTop: screenHeight * 0.025,
  },
  buttonContainer: {
    marginVertical: screenHeight * 0.025,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkRow: {
    flexDirection: 'row',
    width: screenWidth * 0.9,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: screenHeight * 0.025,
    height: screenHeight * 0.05,
  },
  iconStyle: {
    backgroundColor: colors.white,
    height: screenHeight * 0.05,
    width: screenHeight * 0.05,
    borderRadius: screenHeight * 0.025,
    paddingLeft: screenHeight * 0.005,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButton: {
    alignSelf: 'flex-end',
    marginRight: screenWidth * 0.05,
    marginTop: screenHeight * 0.0625,
  },
});

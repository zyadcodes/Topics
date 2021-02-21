// This is going to be the StyleSheet for the profile screen
import {StyleSheet} from 'react-native';
import colors from '../../../config/colors';
import {screenHeight, screenWidth} from '../../../config/dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
});

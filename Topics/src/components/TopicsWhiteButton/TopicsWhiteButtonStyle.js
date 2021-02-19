// This is the StyleSheet for the white button
import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../config/dimensions';
import colors from '../../config/colors';

export default StyleSheet.create({
  outerView: {
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
    paddingVertical: screenHeight * 0.01,
  },
  innerView: {
    backgroundColor: colors.white,
    paddingHorizontal: screenWidth * 0.025,
    paddingVertical: screenHeight * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
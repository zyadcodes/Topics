// This will contain the style for the bottom tab navigation
import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../config/dimensions';
import colors from '../../config/colors';

export default StyleSheet.create({
  tabBarStyle: {
    flexDirection: 'row',
    borderRadius: screenHeight * 0.05,
    position: 'absolute',
    height: screenHeight * 0.1,
    width: screenWidth * 0.4,
    shadowColor: colors.black,
    shadowOffset: {
      height: 3,
    },
    shadowOpacity: 0.5,
    backgroundColor: colors.darkBlue,
    left: screenWidth * 0.3,
    bottom: screenHeight * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableCircleSelected: {
    backgroundColor: colors.lightBlue,
    height: screenHeight * 0.085,
    width: screenHeight * 0.085,
    borderRadius: screenHeight * 0.0425,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableCircleUnselected: {
    height: screenHeight * 0.085,
    width: screenHeight * 0.085,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

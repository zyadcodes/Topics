// This is going to be the StyleSheet for the my topics screen
import {StyleSheet} from 'react-native';
import colors from '../../../config/colors';
import {screenWidth, screenHeight} from '../../../config/dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  blueSection: {
    width: screenWidth,
    height: screenHeight * 0.275,
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
  logoStyle: {
    width: screenHeight * 0.05,
    height: screenHeight * 0.05,
  },
  topicsManagerStyle: {
    textAlign: 'right',
  },
  searchContainer: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.08,
    marginTop: screenHeight * 0.035,
    borderRadius: screenHeight * 0.025,
    backgroundColor: colors.mediumBlue,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  searchIcon: {
      marginLeft: screenWidth * 0.03,
      marginRight: screenWidth * 0.03
  },
  textInputStyle: {
      width: screenWidth * 0.7
  }
});

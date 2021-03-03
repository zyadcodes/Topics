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
});

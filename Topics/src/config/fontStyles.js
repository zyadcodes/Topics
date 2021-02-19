// This file is going to store all of the font styles that are stored throughout the app
import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import colors from './colors';

export default StyleSheet.create({
  /* The font sizes */

  mainFontStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: RFPercentage(3),
  },

  bigFontStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: RFPercentage(4),
  },

  biggerFontStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: RFPercentage(6),
  },

  hugeFontStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: RFPercentage(8),
  },

  /* The font colors */

  black: {
    color: colors.black,
  },
  white: {
    color: colors.white,
  },
  darkBlue: {
    color: colors.darkBlue,
  },
  lightBlue: {
    color: colors.lightBlue,
  },

  /* The font stylings */

  bold: {
    fontFamily: 'HelveticaNeue-Bold',
  },
});

// This is going to take in an SVG as a prop and will render it at the center as a background behind
// all other component
import React from 'react';
import {View} from 'react-native';
import {screenHeight, screenWidth} from '../../config/dimensions';
import SVGBackgroundStyle from './SVGBackgroundStyle';

// Creates the functional component
const SVGBackground = ({SVG}) => {
  // Renders the component
  return (
    <View style={SVGBackgroundStyle.container}>
      <SVG height={screenHeight} width={screenWidth * 10} />
    </View>
  );
};

// exports the component
export default SVGBackground;

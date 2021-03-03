// This is going to be the lighter button component file
import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import TopicsWhiteButtonStyle from './TopicsWhiteButtonStyle';
import fontStyles from '../../config/fontStyles';

// Creates the functional component
const TopicsWhiteButton = ({text, onPress, height, width, fontSize}) => {
  // Renders the component
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        TopicsWhiteButtonStyle.outerView,
        {height, width, borderRadius: height / 2},
      ]}>
      <Text style={[fontSize, fontStyles.darkBlue, fontStyles.bold]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

// Exports the component
export default TopicsWhiteButton;

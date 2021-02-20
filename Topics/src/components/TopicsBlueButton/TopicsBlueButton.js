// This component will be the defualt blue button that is used throughout the app
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import TopicsBlueButtonStyle from './TopicsBlueButtonStyle';
import fontStyles from '../../config/fontStyles'

// Creates the functional component
const TopicsBlueButton = ({text, onPress, height, width, fontSize}) => {
  // Renders the component
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[TopicsBlueButtonStyle.mainButtonStyle, {height, width, borderRadius: height / 2}]}>
      <Text style={[fontSize, fontStyles.white, fontStyles.bold]}>{text}</Text>
    </TouchableOpacity>
  );
};

// Exports the component
export default TopicsBlueButton;

// This is going to be the tab that contains the explore topics section

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ExploreScreenStyle from './ExploreScreenStyle';
import colors from '../../../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/Logo.png';
import strings from '../../../config/strings';
import {Icon} from 'react-native-elements';
import fontStyles from '../../../config/fontStyles';
import {screenHeight} from '../../../config/dimensions';

// Creates the functional component
const ExploreScreen = ({navigation}) => {
  // Stores the state of the searched item
  const [searchInput, setSearchInput] = useState('');

  // Renders the screen
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={ExploreScreenStyle.container}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.darkBlue, colors.lightBlue]}
          style={ExploreScreenStyle.blueSection}>
          <View style={ExploreScreenStyle.blueSectionRow}>
            <View style={ExploreScreenStyle.logoContainer}>
              <Image
                resizeMode={'contain'}
                style={ExploreScreenStyle.logoStyle}
                source={Logo}
              />
            </View>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={[
                  fontStyles.mainFontStyle,
                  fontStyles.bold,
                  fontStyles.white,
                  ExploreScreenStyle.topicsManagerStyle,
                ]}>
                {strings.TopicsManager}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={ExploreScreenStyle.searchContainer}>
            <View style={ExploreScreenStyle.searchIcon}>
              <Icon
                name={'search'}
                type={'font-awesome'}
                color={colors.white}
                size={screenHeight * 0.045}
              />
            </View>
            <TextInput
              value={searchInput}
              onChangeText={async (text) => {
                setSearchInput(text);
              }}
              placeholder={strings.SearchAllTopics}
              placeholderTextColor={colors.white}
              style={[
                fontStyles.white,
                fontStyles.mainFontStyle,
                ExploreScreenStyle.textInputStyle,
              ]}
            />
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Exports the component
export default ExploreScreen;

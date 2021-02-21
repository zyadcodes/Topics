// This is going to be the tab that contains the subscribed topics for the user
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
import MyTopicsScreenStyle from './MyTopicsScreenStyle';
import colors from '../../../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/Logo.png';
import strings from '../../../config/strings';
import {Icon} from 'react-native-elements';
import fontStyles from '../../../config/fontStyles';
import {screenHeight} from '../../../config/dimensions';

// Creates the functional component
const MyTopicsScreen = ({navigation}) => {
  // Stores the state of the searched item
  const [searchInput, setSearchInput] = useState('');

  // Renders the screen
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={MyTopicsScreenStyle.container}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.darkBlue, colors.lightBlue]}
          style={MyTopicsScreenStyle.blueSection}>
          <View style={MyTopicsScreenStyle.blueSectionRow}>
            <View style={MyTopicsScreenStyle.logoContainer}>
              <Image
                resizeMode={'contain'}
                style={MyTopicsScreenStyle.logoStyle}
                source={Logo}
              />
            </View>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={[
                  fontStyles.mainFontStyle,
                  fontStyles.bold,
                  fontStyles.white,
                  MyTopicsScreenStyle.topicsManagerStyle,
                ]}>
                {strings.TopicsManager}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={MyTopicsScreenStyle.searchContainer}>
            <View style={MyTopicsScreenStyle.searchIcon}>
              <Icon
                name={'search'}
                type={'font-awesome'}
                color={colors.white}
                size={screenHeight * 0.055}
              />
            </View>
            <TextInput
              value={searchInput}
              onChangeText={async (text) => {
                setSearchInput(text);
              }}
              placeholder={strings.SearchMyTopics}
              placeholderTextColor={colors.white}
              style={[
                fontStyles.white,
                fontStyles.mainFontStyle,
                MyTopicsScreenStyle.textInputStyle,
              ]}
            />
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Exports the component
export default MyTopicsScreen;

// This is going to be the tab that contains the basic profile information of the user
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import ProfileScreenStyle from './ProfileScreenStyle';
import TopicsBlueButton from '../../../components/TopicsBlueButton/TopicsBlueButton';
import {Icon} from 'react-native-elements';
import fontStyles from '../../../config/fontStyles';
import colors from '../../../config/colors';
import Logo from '../../../assets/Logo.png';
import strings from '../../../config/strings';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import PhoneInput from 'react-native-phone-number-input';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

// Creates the functional component
const ProfileScreen = ({navigation}) => {
  // The input state variables
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  console.log(phoneNumber);

  // The animated variables
  // Creates the animation states
  let currentPos = new Animated.ValueXY({
    x: 0,
    y: screenHeight * 0.35,
  });
  let currentImageWidth = new Animated.Value(screenWidth * 0.5);
  let currentTextSize = new Animated.Value(fontStyles.biggerFontStyle.fontSize);
  let viewOpacity = new Animated.Value(0);

  // The method which will control the animated values
  useEffect(() => {
    // Starts the animation for the image positioning
    Animated.spring(currentPos, {
      overshootClamping: true,
      mass: 100,
      delay: 500,
      toValue: {
        x: 0,
        y: screenHeight * 0.025,
      },
      useNativeDriver: false,
    }).start();

    // Starts the animation for the image zoom
    Animated.timing(currentImageWidth, {
      toValue: screenWidth * 0.35,
      duration: 1200,
      delay: 500,
      useNativeDriver: false,
    }).start();

    // Starts the animation for the font size
    Animated.timing(currentTextSize, {
      toValue: fontStyles.bigFontStyle.fontSize,
      duration: 1200,
      delay: 500,
      useNativeDriver: false,
    }).start();

    // Starts the animation for the view opacity
    Animated.timing(viewOpacity, {
      toValue: 1,
      duration: 1000,
      delay: 1700,
      useNativeDriver: false,
    }).start();
  }, []);

  // Renders the screen
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={ProfileScreenStyle.container}>
          <Animated.View
            style={[
              currentPos.getLayout(),
              ProfileScreenStyle.logoTitleContainer,
            ]}>
            <Animated.Image
              source={Logo}
              style={[{width: currentImageWidth}, ProfileScreenStyle.logoStyle]}
              resizeMode={'contain'}
            />
            <Animated.Text
              style={[
                fontStyles.darkBlue,
                fontStyles.biggerFontStyle,
                fontStyles.bold,
                ProfileScreenStyle.textContainer,
                {
                  fontSize: currentTextSize,
                },
              ]}>
              {strings.WelcomeToTopics}
            </Animated.Text>
          </Animated.View>
          <Animated.View
            style={[
              ProfileScreenStyle.inputViewContainer,
              {opacity: viewOpacity},
            ]}>
            <View style={ProfileScreenStyle.inputContainer}>
              <Icon
                color={colors.gray}
                type={'font-awesome'}
                name={'user'}
                size={screenHeight * 0.05}
              />
              <TextInput
                value={email}
                autoCapitalize={'none'}
                autoCompleteType={'email'}
                autoCorrect={false}
                textContentType={'emailAddress'}
                keyboardType={'email-address'}
                returnKeyType={'done'}
                onChangeText={(newText) => setEmail(newText)}
                placeholder={strings.EmailDotDotDot}
                placeholderTextColor={colors.gray}
                style={[
                  fontStyles.gray,
                  fontStyles.subFontStyle,
                  ProfileScreenStyle.textInput,
                ]}
              />
            </View>
            <View style={ProfileScreenStyle.inputContainer}>
              <PhoneInput
                textInputStyle={[fontStyles.gray, fontStyles.subFontStyle]}
                textInputProps={{
                  placeholder: strings.PhoneNumberDotDotDot,
                  placeholderColor: colors.gray,
                }}
                containerStyle={ProfileScreenStyle.phoneNumberInput}
                defaultCode={'US'}
                onChangeFormattedText={(text) => {
                  setPhoneNumber(text);
                }}
              />
            </View>
            <View style={ProfileScreenStyle.inputContainer}>
              <Icon
                color={colors.gray}
                type={'font-awesome'}
                name={'lock'}
                size={screenHeight * 0.05}
              />
              <TextInput
                value={password}
                autoCapitalize={'none'}
                autoCompleteType={'password'}
                autoCorrect={false}
                textContentType={'password'}
                returnKeyType={'done'}
                onChangeText={(newText) => setPassword(newText)}
                placeholder={strings.PasswordDotDotDot}
                placeholderTextColor={colors.gray}
                style={[
                  fontStyles.gray,
                  fontStyles.subFontStyle,
                  ProfileScreenStyle.textInput,
                ]}
                secureTextEntry={true}
              />
            </View>
            <View style={ProfileScreenStyle.termsAndConditionsRow}>
              <Text style={[fontStyles.midFontStyle, fontStyles.black]}>
                {strings.IHaveReadAndAcceptedThe}
                <TouchableOpacity onPress={() => {}}>
                  <Text style={[fontStyles.midFontStyle, fontStyles.lightBlue]}>
                    {strings.TermsAndConditions}
                  </Text>
                </TouchableOpacity>
              </Text>
              <CheckBox
                disabled={false}
                value={isChecked}
                onValueChange={(newValue) => setIsChecked(newValue)}
                tintColors={{
                  true: colors.lightBlue,
                  false: colors.gray,
                }}
                tintColor={colors.lightBlue}
                onCheckColor={colors.white}
                onFillColor={colors.lightBlue}
                onTintColor={colors.lightBlue}
                boxType={'square'}
              />
            </View>
            <View style={ProfileScreenStyle.buttonContainer}>
              <TopicsBlueButton
                text={strings.Create}
                onPress={() => {}}
                height={screenHeight * 0.065}
                width={screenWidth * 0.75}
                fontSize={fontStyles.bigFontStyle}
              />
            </View>
            <View style={ProfileScreenStyle.textRow}>
              <Text style={[fontStyles.midFontStyle, fontStyles.black]}>
                {strings.AlreadyHaveAnAccount}
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text
                  style={[fontStyles.midFontStyle, fontStyles.lightBlue]}
                  onPress={() => {}}>
                  {strings.LogIn}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Exports the component
export default ProfileScreen;

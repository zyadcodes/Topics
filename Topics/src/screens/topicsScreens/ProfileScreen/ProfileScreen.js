// This is going to be the tab that contains the basic profile information of the user
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Image,
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
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-spinkit';
import {sleep} from '../../../config/sleep';
import {createUser, signOut} from '../../../config/server';
import LinearGradient from 'react-native-linear-gradient';

// Creates the functional component
const ProfileScreen = ({navigation}) => {
  // The input state variables
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  // The animated variables
  let currentPos = new Animated.ValueXY({
    x: 0,
    y: screenHeight * 0.35,
  });
  let currentImageWidth = new Animated.Value(screenWidth * 0.5);
  let currentTextSize = new Animated.Value(fontStyles.biggerFontStyle.fontSize);
  let viewOpacity = new Animated.Value(0);

  // A ref variable for the phone number
  const phoneRef = useRef();

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
  }, [isLoggedIn]);

  // This method is going to validate the input and, if correct, it will send the proper data up
  // to the server. If anything is off, it will show an error message
  const validateInput = async () => {
    if (!email.includes('@') || email.length < 5) {
      setErrorMessage(strings.PleaseEnterAValidEmailAddress);
      setErrorVisible(true);
    } else if (phoneNumber.length === 0) {
      setErrorMessage(strings.PleaseEnterAValidPhoneNumber);
      setErrorVisible(true);
    } else if (password.length <= 6) {
      setErrorMessage(strings.PleaseEnterAValidPassword);
      setErrorVisible(true);
    } else if (isChecked === false) {
      setErrorMessage(strings.PleaseAcceptTheTermsAndConditions);
      setErrorVisible(true);
    } else {
      setIsLoading(true);
      const result = await createUser(
        email,
        formattedPhoneNumber,
        phoneNumber,
        countryCode,
        password,
      );
      if (result === 1) {
        await sleep(1500);
        setIsLoading(false);
        await sleep(500);
        setErrorMessage(strings.ThisEmailIsInUse);
        setErrorVisible(true);
      } else {
        await sleep(1500);
        setIsLoading(false);
        await sleep(500);
        // Starts the animation to show the new screen
        setIsLoggedIn(true);
      }
    }
  };

  // Renders the screen if a user is logged in
  if (isLoggedIn) {
    return (
      <KeyboardAvoidingView
        key={currentTextSize}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[ProfileScreenStyle.container]}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[colors.darkBlue, colors.lightBlue]}
              style={ProfileScreenStyle.blueSection}>
              <View style={ProfileScreenStyle.blueSectionRow}>
                <View style={ProfileScreenStyle.logoContainer}>
                  <Image
                    resizeMode={'contain'}
                    style={ProfileScreenStyle.myAccountLogoStyle}
                    source={Logo}
                  />
                </View>
                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={[
                      fontStyles.mainFontStyle,
                      fontStyles.bold,
                      fontStyles.white,
                      ProfileScreenStyle.topicsManagerStyle,
                    ]}>
                    {strings.TopicsManager}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  fontStyles.bigFontStyle,
                  fontStyles.bold,
                  fontStyles.white,
                  ProfileScreenStyle.myAccountStyle,
                ]}>
                {strings.MyAccount}
              </Text>
            </LinearGradient>
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
                ref={phoneRef}
                value={phoneNumber}
                textInputStyle={[fontStyles.gray, fontStyles.subFontStyle]}
                textInputProps={{
                  placeholder: strings.PhoneNumberDotDotDot,
                  placeholderColor: colors.gray,
                }}
                containerStyle={ProfileScreenStyle.phoneNumberInput}
                defaultCode={'US'}
                onChangeFormattedText={(text) => {
                  setCountryCode(phoneRef.current?.getCountryCode() || '');
                  setFormattedPhoneNumber(text);
                }}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                }}
              />
            </View>
            <TopicsBlueButton
              text={strings.SaveInfo}
              onPress={() => {}}
              height={screenHeight * 0.065}
              width={screenWidth * 0.75}
              fontSize={fontStyles.bigFontStyle}
            />
            <TouchableOpacity style={[ProfileScreenStyle.linkRow]}>
              <Text style={[fontStyles.black, fontStyles.mainFontStyle]}>
                {strings.TermsAndConditions}
              </Text>
              <View style={ProfileScreenStyle.iconStyle}>
                <Icon
                  type={'font-awesome'}
                  name={'angle-right'}
                  size={screenHeight * 0.05}
                  color={colors.white}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[ProfileScreenStyle.linkRow]}>
              <Text style={[fontStyles.black, fontStyles.mainFontStyle]}>
                {strings.PrivacyPolicy}
              </Text>
              <View style={ProfileScreenStyle.iconStyle}>
                <Icon
                  type={'font-awesome'}
                  name={'angle-right'}
                  size={screenHeight * 0.05}
                  color={colors.white}
                />
              </View>
            </TouchableOpacity>
            <View style={ProfileScreenStyle.signOutButton}>
              <TopicsBlueButton
                text={strings.SignOut}
                onPress={async () => {
                  signOut();
                  setIsLoading(true);
                  await sleep(1500);
                  setIsLoading(false);
                  await sleep(500);
                  setIsLoggedIn(false);
                }}
                height={screenHeight * 0.05}
                width={screenWidth * 0.32}
                fontSize={fontStyles.midFontStyle}
              />
            </View>
            <AwesomeAlert
              show={isLoading}
              closeOnTouchOutside={false}
              showCancelButton={false}
              showConfirmButton={false}
              customView={
                <Spinner
                  isVisible={true}
                  size={100}
                  type={'Bounce'}
                  color={colors.lightBlue}
                />
              }
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  // Renders the screen if there is no user logged in
  return (
    <KeyboardAvoidingView
      key={currentTextSize}
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
                ref={phoneRef}
                textInputStyle={[fontStyles.gray, fontStyles.subFontStyle]}
                textInputProps={{
                  placeholder: strings.PhoneNumberDotDotDot,
                  placeholderColor: colors.gray,
                }}
                containerStyle={ProfileScreenStyle.phoneNumberInput}
                defaultCode={'US'}
                onChangeFormattedText={(text) => {
                  setCountryCode(phoneRef.current?.getCountryCode() || '');
                  setFormattedPhoneNumber(text);
                }}
                onChangeText={(text) => {
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
                onPress={() => {
                  validateInput();
                }}
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
                <Text style={[fontStyles.midFontStyle, fontStyles.lightBlue]}>
                  {strings.LogIn}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <AwesomeAlert
            show={errorVisible}
            title={strings.Whoops}
            message={errorMessage}
            closeOnTouchOutside={true}
            showCancelButton={false}
            showConfirmButton={true}
            titleStyle={[
              fontStyles.mainFontStyle,
              fontStyles.gray,
              {textAlign: 'center'},
            ]}
            messageStyle={[
              fontStyles.subFontStyle,
              fontStyles.gray,
              {textAlign: 'center'},
            ]}
            confirmButtonTextStyle={[
              fontStyles.subFontStyle,
              fontStyles.white,
              {textAlign: 'center'},
            ]}
            confirmText={strings.Ok}
            confirmButtonColor={colors.darkBlue}
            onConfirmPressed={() => {
              setErrorVisible(false);
            }}
          />
          <AwesomeAlert
            show={isLoading}
            closeOnTouchOutside={false}
            showCancelButton={false}
            showConfirmButton={false}
            customView={
              <Spinner
                isVisible={true}
                size={100}
                type={'Bounce'}
                color={colors.lightBlue}
              />
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Exports the component
export default ProfileScreen;

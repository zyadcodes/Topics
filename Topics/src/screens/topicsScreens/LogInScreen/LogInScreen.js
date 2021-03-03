// This is going to be the login screen where returning users can log back into the app
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import strings from '../../../config/strings';
import fontStyles from '../../../config/fontStyles';
import {Icon} from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import {sleep} from '../../../config/sleep';
import AwesomeAlert from 'react-native-awesome-alerts';
import TopicsWhiteButton from '../../../components/TopicsWhiteButton/TopicsWhiteButton';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import LogInScreenStyle from './LogInScreenStyle';
import colors from '../../../config/colors';
import Logo from '../../../assets/Logo.png';
import {logIn} from '../../../config/server';
import Lines from '../../../assets/Lines.png';

// Creates the functional component
const LogInScreen = ({navigation}) => {
  // The state variables for the screen
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  // This method is going to attempt to log the user into their account
  const validateInput = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setIsErrorVisible(true);
      return;
    }

    setIsLoading(true);
    const userID = await logIn(email.trim(), password.trim());

    // Shows a message if input is incrrect
    if (userID === -1) {
      setIsLoading(false);
      await sleep(500);
      setIsErrorVisible(true);
    } else {
      setIsLoading(false);
      await sleep(500);
      navigation.push('TopicsScreens');
    }
  };

  // Renders the screen
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground style={LogInScreenStyle.container} source={Lines}>
          <TouchableOpacity
            style={LogInScreenStyle.backButtonContainer}
            onPress={() => navigation.goBack()}>
            <Icon
              type={'font-awesome'}
              name={'angle-left'}
              size={screenHeight * 0.05}
              color={colors.lightBlue}
            />
          </TouchableOpacity>
          <View style={LogInScreenStyle.logoTitleContainer}>
            <Image
              source={Logo}
              style={LogInScreenStyle.logoStyle}
              resizeMode={'contain'}
            />
            <Text
              style={[
                fontStyles.white,
                fontStyles.biggerFontStyle,
                fontStyles.bold,
                LogInScreenStyle.textContainer,
              ]}>
              {strings.WelcomeBack}
            </Text>
          </View>
          <View style={LogInScreenStyle.inputContainer}>
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
              placeholderTextColor={colors.white}
              style={[
                fontStyles.white,
                fontStyles.midFontStyle,
                fontStyles.bold,
                LogInScreenStyle.textInput,
              ]}
            />
          </View>
          <View style={LogInScreenStyle.inputContainer}>
            <TextInput
              value={password}
              autoCapitalize={'none'}
              autoCompleteType={'password'}
              autoCorrect={false}
              textContentType={'password'}
              returnKeyType={'done'}
              onChangeText={(newText) => setPassword(newText)}
              placeholder={strings.PasswordDotDotDot}
              placeholderTextColor={colors.white}
              style={[
                fontStyles.white,
                fontStyles.midFontStyle,
                fontStyles.bold,
                LogInScreenStyle.textInput,
              ]}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={LogInScreenStyle.forgotPasswordStyle}
            onPress={() => navigation.push('ForgotPasswordScreen')}>
            <Text
              style={[
                fontStyles.white,
                fontStyles.mainFontStyle,
                fontStyles.bold,
              ]}>
              {strings.ForgotPasswordQuestion}
            </Text>
          </TouchableOpacity>
          <View style={LogInScreenStyle.buttonContainer}>
            <TopicsWhiteButton
              text={strings.LogIn}
              onPress={() => {
                validateInput();
              }}
              height={screenHeight * 0.065}
              width={screenWidth * 0.75}
              fontSize={fontStyles.bigFontStyle}
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
          <AwesomeAlert
            show={isErrorVisible}
            title={strings.IncorretInfo}
            message={strings.IncorrectEmailPassword}
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
              setIsErrorVisible(false);
            }}
          />
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Exports the component
export default LogInScreen;

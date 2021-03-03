// This is the screen that will allow users to reset their passwords
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
} from 'react-native';
import {Icon} from 'react-native-elements';
import {sleep} from '../../../config/sleep';
import AwesomeAlert from 'react-native-awesome-alerts';
import strings from '../../../config/strings';
import fontStyles from '../../../config/fontStyles';
import TopicsWhiteButton from '../../../components/TopicsWhiteButton/TopicsWhiteButton';
import {screenHeight, screenWidth} from '../../../config/dimensions';
import ForgotPasswordScreenStyle from './ForgotPasswordScreenStyle';
import colors from '../../../config/colors';
import Logo from '../../../assets/Logo.png';
import {resetPassword} from '../../../config/server';

// Creates the functional component
const ForgotPasswordScreen = ({navigation}) => {
  // Establishes the component's state
  const [email, setEmail] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  // Renders the screen
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={ForgotPasswordScreenStyle.container}>
          <TouchableOpacity
            style={ForgotPasswordScreenStyle.backButtonContainer}
            onPress={() => navigation.goBack()}>
            <Icon
              type={'font-awesome'}
              name={'angle-left'}
              size={screenHeight * 0.05}
              color={colors.white}
            />
          </TouchableOpacity>
          <View style={ForgotPasswordScreenStyle.logoTitleContainer}>
            <Image
              source={Logo}
              style={ForgotPasswordScreenStyle.logoStyle}
              resizeMode={'contain'}
            />
            <Text
              style={[
                fontStyles.darkBlue,
                fontStyles.bigFontStyle,
                fontStyles.bold,
                ForgotPasswordScreenStyle.textContainer,
              ]}>
              {strings.ForgotPassword}
            </Text>
            <Text
              style={[
                fontStyles.darkBlue,
                fontStyles.mainFontStyle,
                fontStyles.bold,
                ForgotPasswordScreenStyle.subTextContainer,
              ]}>
              {strings.ItHappens}
            </Text>
          </View>
          <View style={ForgotPasswordScreenStyle.inputContainer}>
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
                ForgotPasswordScreenStyle.textInput,
              ]}
            />
          </View>
          <View style={ForgotPasswordScreenStyle.buttonContainer}>
            <TopicsWhiteButton
              text={strings.SendResetEmail}
              onPress={() => {
                resetPassword(email);
                setIsSuccessVisible(true);
              }}
              height={screenHeight * 0.065}
              width={screenWidth * 0.75}
              fontSize={fontStyles.mainFontStyle}
            />
          </View>
          <AwesomeAlert
            show={isSuccessVisible}
            title={strings.EmailSent}
            message={strings.EmailSentMessage}
            closeOnTouchOutside={false}
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
            onConfirmPressed={async () => {
              setIsSuccessVisible(false);
              await sleep(500);
              navigation.goBack();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Exports the screen
export default ForgotPasswordScreen;

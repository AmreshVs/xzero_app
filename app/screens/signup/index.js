import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Constants from 'expo-constants';

import { saveUserDataLocally } from 'screens/login/helpers';
import TopNavigator from 'components/topNavigator';
import SafeView from 'components/safeView';
import Textbox from 'components/textbox';
import Button from 'components/button';
import HeadingCaption from 'components/headingCaption';
import FormError from 'components/formError';
import { ToastMsg } from 'components/toastMsg';
import { firstLetterUpper, handleServerDOB, getFormatedDate } from 'constants/commonFunctions';
import { LOGIN_SCREEN, OTP, SIGNUP_SCREEN } from 'navigation/routes';
import { UserDataContext } from 'context';
import { CREATE_USER, UPDATE_NOTIFICATION_TOKEN } from 'graphql/mutations';
import useErrorLog from 'hooks/useErrorLog';
import { getNotificationToken } from '../../../helpers';
import { inputsValidationSchema, inputs } from './helpers';
import styles from './styles';

const Signup = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { setUserData } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const { logError } = useErrorLog();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const client = useApolloClient();
  let language = i18n.language;

  const platform = Platform.OS;
  const app_version = Constants.nativeAppVersion;
  const device_id = Constants.deviceId;

  const updateNotificationToken = async (id) => {
    const token = await getNotificationToken();

    let mutationInput = {
      user_id: Number(id),
      notification_token: token,
    };

    if (token) {
      try {
        await client.mutate({
          mutation: UPDATE_NOTIFICATION_TOKEN,
          variables: mutationInput,
        });
      }
      catch (error) {
        console.log('Update Notification token error', error);
        ToastMsg(t('error_occured'));
        logError({
          screen: SIGNUP_SCREEN,
          module: 'Update Notification Token',
          input: JSON.stringify(mutationInput),
          error: JSON.stringify(error)
        });
      }
    }
  };

  const handleSubmit = async (values) => {
    let phone = values.phone.replace('+', '');
    setLoading(true);
    const token = await getNotificationToken();

    let mutationInput = {
      username: values.fullname,
      email: values.email,
      password: values.repassword,
      mobile_number: Number(phone),
      notification_token: token || '',
      birthday: new Date(values.dob),
      language: language,
      provider: 'local',
      platform,
      app_version,
      device_id
    };

    let { data, errors } = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        input: mutationInput
      },
    });

    let userData = data?.createNewUser;

    setUserData({
      jwt: userData?.jwt,
      ...userData?.user
    });

    setLoading(false);

    if (errors) {
      logError({
        screen: SIGNUP_SCREEN,
        module: 'Create User',
        input: JSON.stringify(mutationInput),
        error: JSON.stringify(errors)
      });
    }

    if (errors && errors[0]?.extensions?.exception?.code === 400) {
      ToastMsg(errors[0].message);
      return;
    }

    if (userData && userData?.jwt) {
      saveUserDataLocally('xzero_user', userData?.user);
      saveUserDataLocally('xzero_jwt', userData?.jwt);
      navigation.replace(OTP, {
        user_id: userData?.user?.id,
        mobile_number: userData?.user?.mobile_number
      });
      await updateNotificationToken(userData?.user?.id);
    }
  };

  const RenderHaveAccount = () => {
    const accArr = [
      <Text key={0}>{t('have_account')}</Text>,
      <Text key={1} style={styles.signup} onPress={() => navigation.replace(LOGIN_SCREEN)}>
        {t('login')}
      </Text>,
    ];

    return <Text>{languageOrder(accArr)}</Text>
  };

  const RenderTerms = () => {
    let termsArr = [
      <Text key={0} style={styles.terms} onPress={() => navigation.replace(HOME_SCREEN)}>
        {t('by_signing_up')}
      </Text>,
      <Text key={1} style={styles.termsLink} onPress={() => navigation.navigate(DRAWER_TERMS)}>
        {t('terms')}
      </Text>,
    ];

    return <Text>{languageOrder(termsArr)}</Text>
  };

  const languageOrder = (langArr) => {
    if (language === 'en') {
      return langArr;
    } else {
      return [langArr[1], langArr[0]];
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : -150}
      behavior={'position'}
    >
      <SafeView style={styles.container}>
        <TopNavigator style={styles.topNav} />
        <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="always">
          <Image source={require('../../../assets/logo.png')} style={styles.logo} />
          <HeadingCaption heading={t('get_started')} caption={t('signup_note')} />
          <View style={styles.inputsContainer}>
            <Formik
              onSubmit={(values) => handleSubmit(values)}
              validationSchema={inputsValidationSchema}
              initialValues={{
                fullname: '',
                email: '',
                phone: '+971',
                password: '',
                repassword: '',
                dob: '',
              }}
            >
              {({
                values,
                handleChange,
                errors,
                touched,
                setFieldTouched,
                isValid,
                handleSubmit,
                setFieldValue,
              }) => (
                <>
                  {inputs.map(({ name, placeholder, icon, marginTop }, index) => (
                    <View key={index}>
                      <Textbox
                        placeholder={placeholder ? placeholder : firstLetterUpper(name)}
                        value={values[name]}
                        onChangeText={handleChange(name)}
                        icon={icon}
                        marginTop={marginTop}
                        onBlur={() => setFieldTouched(name)}
                        autoCapitalize="none"
                        secureTextEntry={name.includes('password', 'repassword') ? true : false}
                        style={styles.textbox}
                        keyboardType={
                          name === 'phone'
                            ? 'number-pad'
                            : name === 'email'
                              ? 'email-address'
                              : 'default'
                        }
                        showSoftInputOnFocus={name === 'dob' ? false : true}
                        onTouchEnd={() => name === 'dob' && setDatePickerVisibility(true)}
                      />
                      <FormError touched={touched[name]} errorText={errors[name]} />
                    </View>
                  ))}
                  <View style={styles.btnContainer}>
                    <Button
                      icon="sign-in-alt"
                      width="100%"
                      onPress={() => handleSubmit()}
                      disabled={!isValid}
                      loading={loading}
                    >
                      {t('signup')}
                    </Button>
                  </View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    date={date}
                    onConfirm={(date) => {
                      setDatePickerVisibility(false);
                      setDate(date);
                      setFieldValue('dob', getFormatedDate(date));
                    }}
                    onCancel={() => setDatePickerVisibility(false)}
                    isDarkModeEnabled={false}
                  />
                </>
              )}
            </Formik>
          </View>
          <View style={styles.haveAccount}>
            <RenderHaveAccount />
          </View>
          <View style={styles.termsContainer}>
            <RenderTerms />
          </View>
        </ScrollView>
      </SafeView>
    </KeyboardAvoidingView>
  );
}

export default Signup;
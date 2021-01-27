import React, { useContext, useState, memo, useEffect } from 'react';
import { Text, Image, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Formik } from 'formik';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';
import { getDeviceLang } from 'i18n';
import { useDispatch } from 'react-redux';

import SafeView from 'components/safeView';
import Textbox from 'components/textbox';
import Button from 'components/button';
import HeadingCaption from 'components/headingCaption';
import FormError from 'components/formError';
import Row from 'components/row';
import { ToastMsg } from 'components/toastMsg';
import { SOCIAL_TOKEN, ERROR_OCCURED } from 'constants/common';
import { UserDataContext } from 'context';
import { GET_USER_BY_EMAIL, NON_USER_CHECK } from 'graphql/queries';
import { USER_LOGIN, CREATE_USER, UPDATE_NOTIFICATION_TOKEN, CREATE_NON_USER } from 'graphql/mutations';
import { SIGNUP_SCREEN, HOME_SCREEN, FORGOT_PASSWORD, DRAWER_TERMS, LOGIN_SCREEN, MAIN_SCREEN } from 'navigation/routes';
import useErrorLog from 'hooks/useErrorLog';
import { SetUserData } from 'redux/actions';
import { getNotificationToken } from '../../../helpers';
import { inputsValidationSchema, saveUserDataLocally } from './helpers';
import AppleLoginButton from './appleLogin';
import facebookLogin from './facebookLogin';
import googleSignin from './googleLogin';
import styles from './styles';

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const { logError } = useErrorLog();
  const { setUserData } = useContext(UserDataContext);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  let language = i18n.language;

  const platform = Platform.OS;
  const app_version = Constants.nativeAppVersion;
  const device_id = Constants.deviceId;

  useEffect(() => {
    collectNonUserToken();
  }, []);

  const collectNonUserToken = async () => {
    let token = await getNotificationToken();
    let language = await getDeviceLang();
    let mutationInput = {
      notification_token: token,
      language,
      device_id,
      app_version,
      platform
    };

    try {
      if (device_id !== undefined) {
        const { data } = await client.query({
          query: NON_USER_CHECK,
          variables: {
            device_id
          }
        });

        if (data?.nonUsers?.length === 0 && data?.users?.length === 0) {
          await client.mutate({
            mutation: CREATE_NON_USER,
            variables: {
              data: mutationInput
            }
          });
        }
      }
    }
    catch (error) {
      // console.log('Create Non User Error', error);
      ToastMsg(t('error_occured'));
      logError({
        screen: LOGIN_SCREEN,
        module: 'Non User Insert',
        input: JSON.stringify(mutationInput),
        error: JSON.stringify(error)
      });
    }
  }

  const handleSubmit = async (values) => {
    setLoading(true);
    const mutationInput = {
      identifier: values.email,
      password: values.password,
      platform,
      app_version,
      device_id,
      provider: values?.type || 'local'
    };

    const { data: response, errors } = await client.mutate({
      mutation: USER_LOGIN,
      variables: {
        input: mutationInput
      },
    });

    let loginData = response?.userlogin;

    setLoading(false);

    if (errors) {
      // console.log('Login Error', errors);
      ToastMsg(t('error_occured'));
      logError({
        screen: LOGIN_SCREEN,
        module: 'Login Index file',
        input: JSON.stringify(mutationInput),
        error: JSON.stringify(errors)
      });
    }

    if (errors && errors[0]?.extensions?.exception?.code === 400) {
      ToastMsg(errors[0]?.extensions?.exception?.data?.data[0].messages[0].message);
      return;
    }

    if (loginData && loginData?.user) {

      dispatch(SetUserData({
        jwt: loginData?.jwt,
        ...loginData?.user,
        profile_pic: values?.profile_pic
      }));

      await saveUserDataLocally('xzero_user', { ...loginData?.user, profile_pic: values?.profile_pic });
      await saveUserDataLocally('xzero_jwt', loginData?.jwt);
      if (loginData?.user?.confirmed === true || loginData?.user?.provider !== 'local' || loginData?.user?.mobile_number === 0) {
        navigation.replace(HOME_SCREEN);
      }
      else {
        navigation.replace(MAIN_SCREEN);
      }
      updateNotificationToken(loginData?.user?.id);
    }
  };

  const updateNotificationToken = async (id) => {
    const token = await getNotificationToken();

    const mutationInput = {
      user_id: Number(id),
      notification_token: token || "",
    };

    try {
      await client.mutate({
        mutation: UPDATE_NOTIFICATION_TOKEN,
        variables: mutationInput,
      });
    }
    catch (error) {
      // console.log('Update notification error', error);
      ToastMsg(t('error_occured'));
      logError({
        screen: LOGIN_SCREEN,
        module: 'Update Notification Token',
        input: JSON.stringify(mutationInput),
        error: JSON.stringify(error)
      });
    }
  };

  const handleSocialLogin = async (type, data) => {
    let socialData =
      type === 'fb' ? await facebookLogin(logError) : type === 'g' ? await googleSignin(logError) : null;

    if (type === 'apple') {
      socialData = data;
    }

    if (socialData !== null && socialData.error !== null) {
      try {
        setLoading(true);
        const { data } = await client.query({
          query: GET_USER_BY_EMAIL,
          variables: { email: socialData.email },
        });
        setLoading(false);
        if (data?.users.length === 0) {
          await handleCreateUser(socialData, type);
        } else {
          // Login user, if already signed in
          handleSubmit({ ...socialData, password: socialData.email + SOCIAL_TOKEN, type });
        }
      }
      catch (error) {
        // console.log('Getting user Data error', error);
        setLoading(false);
        ToastMsg(t('error_occured'));
        logError({
          screen: LOGIN_SCREEN,
          module: 'Get User By Email',
          input: JSON.stringify({ email: socialData.email }),
          error: JSON.stringify(error)
        });
      }
    } else {
      setLoading(false);
      ToastMsg(ERROR_OCCURED);
    }
  };

  const handleCreateUser = async (values, provider) => {
    setLoading(true);
    const token = (await getNotificationToken()) || '';

    const mutationInput = {
      username: values?.username,
      email: values?.email,
      password: values?.email + SOCIAL_TOKEN,
      mobile_number: Number(0),
      notification_token: String(token) || '',
      provider,
      platform,
      app_version,
      device_id,
      language,
    };

    try {
      let { data, errors } = await client.mutate({
        mutation: CREATE_USER,
        variables: {
          input: mutationInput,
        }
      });
      setLoading(false);

      logError({
        screen: LOGIN_SCREEN,
        module: 'Create User',
        input: JSON.stringify(mutationInput),
        error: JSON.stringify(errors)
      });

      if (errors && errors[0]?.extensions?.exception?.code === 400) {
        ToastMsg(errors[0].message);
        return;
      }

      if (data && data?.createNewUser?.jwt) {
        dispatch(SetUserData({
          jwt: loginData?.jwt,
          ...loginData?.user,
          profile_pic: values?.profile_pic
        }));
        await saveUserDataLocally('xzero_jwt', data?.createNewUser?.jwt);
        await saveUserDataLocally('xzero_user', data?.createNewUser?.user);
        await updateNotificationToken(data?.createNewUser?.user?.id);
        navigation.replace(HOME_SCREEN);
      }
    } catch (error) {
      // console.log('From login error', error);
      logError({
        screen: LOGIN_SCREEN,
        module: 'Create User',
        input: JSON.stringify({
          username: values?.username,
          email: values?.email,
          password: values?.email + SOCIAL_TOKEN,
          mobile_number: Number(0),
          notification_token: String(token) || '',
        }),
        error: JSON.stringify(error)
      });
      if (loading) {
        setLoading(!loading);
      }
      ToastMsg(t('error_occured'));
    }
  };

  const RenderTerms = () => {
    let termsArray = [
      <Text style={styles.terms} onPress={() => navigation.replace(HOME_SCREEN)} key={0}>
        {t('by_signing_in')}
      </Text>,
      <Text
        style={styles.termsLink}
        onPress={() => navigation.navigate(DRAWER_TERMS, { login: true })}
        key={1}
      >
        {t('terms')}
      </Text>,
    ];

    return <Text>{languageOrder(termsArray)}</Text>
  };

  const RenderNoAccount = () => {
    let noAccArr = [
      <Text key={0}>{t('no_account')}</Text>,
      <Text key={1} style={styles.signup} onPress={() => navigation.push(SIGNUP_SCREEN)}>
        {t('signup')}
      </Text>,
    ];

    return languageOrder(noAccArr);
  };

  const languageOrder = (langArr) => {
    if (language === 'en') {
      return langArr;
    } else {
      return [langArr[1], langArr[0]];
    }
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={-250} behavior={'position'}>
      <SafeView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollview} keyboardShouldPersistTaps="always">
          <Image source={require('../../../assets/logo.png')} style={styles.logo} />
          <HeadingCaption heading={t('welcome')} caption={t('login_note')} />
          <View style={styles.inputsContainer}>
            <Formik
              onSubmit={(values) => handleSubmit(values)}
              validationSchema={inputsValidationSchema}
              initialValues={{
                email: '',
                password: '',
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
              }) => (
                <>
                  <Textbox
                    placeholder="Email"
                    icon="at"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    autoCapitalize="none"
                  />
                  <FormError touched={touched.email} errorText={errors.email} />
                  <Textbox
                    placeholder="Password"
                    icon="key"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    autoCapitalize="none"
                    secureTextEntry
                  />
                  <FormError touched={touched.password} errorText={errors.password} />
                  <Text
                    style={styles.forgotPassword}
                    onPress={() => navigation.push(FORGOT_PASSWORD)}
                  >
                    {t('forgot_password')}
                  </Text>
                  <Button
                    icon="sign_in_alt"
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                    loading={loading}
                    style={styles.loginButton}
                  >
                    {t('login')}
                  </Button>
                </>
              )}
            </Formik>
            <View style={styles.noAccount}>
              <RenderNoAccount />
            </View>
          </View>
          <View style={styles.socialLoginContainer}>
            <Text style={styles.loginOptionText}>{t('login_using')}</Text>
            {Platform.OS !== 'ios' && (
              <View style={styles.btnContainer}>
                <Button
                  width="48%"
                  icon="facebook"
                  color="#3b5998"
                  iconColor="#3b5998"
                  onPress={() => handleSocialLogin('fb')}
                  outline
                >
                  {t('facebook')}
                </Button>
                <Button
                  width="48%"
                  icon="google"
                  color="#db3236"
                  iconColor="#db3236"
                  onPress={() => handleSocialLogin('g')}
                  outline
                >
                  {t('google')}
                </Button>
              </View>
            )}
            {Platform.OS === 'ios' && (
              <Row>
                <AppleLoginButton handleSocialLogin={handleSocialLogin} />
              </Row>
            )}
          </View>
          <Row style={styles.termsContainer}>
            <RenderTerms />
          </Row>
          <Text style={styles.skip} onPress={() => navigation.replace(HOME_SCREEN)}>
            {t('skip')}
          </Text>
        </ScrollView>
      </SafeView>
    </KeyboardAvoidingView>
  );
}


export default memo(Login);
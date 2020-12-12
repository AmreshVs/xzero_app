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

import TopNavigator from 'components/topNavigator';
import SafeView from 'components/safeView';
import Textbox from 'components/textbox';
import Button from 'components/button';
import HeadingCaption from 'components/headingCaption';
import Column from 'components/column';
import FormError from 'components/formError';
import { inputsValidationSchema, inputs } from './helpers';
import styles from './styles';
import { LOGIN_SCREEN } from 'navigation/routes';
import { CREATE_USER, UPDATE_NOTIFICATION_TOKEN } from 'graphql/mutations';
import { saveUserDataLocally } from 'screens/login/helpers';
import { getNotificationToken } from '../../../helpers';
import { ToastMsg } from 'components/toastMsg';
import { firstLetterUpper, handleServerDOB, getFormatedDate } from 'constants/commonFunctions';
import { UserDataContext } from 'context';

export default function Signup({ navigation }) {
  const { t, i18n } = useTranslation();
  const { setUserData } = useContext(UserDataContext);
  let language = i18n.language;
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const client = useApolloClient();

  const updateNotificationToken = async (id) => {
    const token = await getNotificationToken();
    const platform = Platform.OS;
    const app_version = Constants.nativeAppVersion;
    if (token) {
      await client.mutate({
        mutation: UPDATE_NOTIFICATION_TOKEN,
        variables: {
          user_id: Number(id),
          notification_token: token,
          app_version,
          platform,
          provider: 'local',
        },
      });
    }
  };

  const handleSubmit = async (values) => {
    let phone = values.phone.replace('+', '');
    setLoading(true);
    const token = await getNotificationToken();
    let dob = handleServerDOB(values.dob);

    let { data, errors } = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        username: values.fullname,
        email: values.email,
        password: values.repassword,
        mobile_number: Number(phone),
        notification_token: token || '',
        dob: new Date(dob),
      },
    });

    let userData = data?.createNewUser;

    setUserData({
      jwt: userData?.jwt,
      id: userData?.user?.id,
      email: userData?.user?.email,
      mobile_number: userData?.user?.mobile_number
    });

    setLoading(false);

    if (errors && errors[0]?.extensions?.exception?.code === 400) {
      ToastMsg(errors[0].message);
      return;
    }

    if (userData && userData?.jwt) {
      saveUserDataLocally('xzero_user', userData?.user);
      saveUserDataLocally('xzero_jwt', userData?.jwt);
      navigation.replace('Home');
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

    return languageOrder(accArr);
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

    return languageOrder(termsArr);
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
        <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps={true}>
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
                        onTouchStart={() => name === 'dob' && setDatePickerVisibility(true)}
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

import React, { useState, memo } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Formik } from 'formik';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';

import SafeView from 'components/safeView';
import Textbox from 'components/textbox';
import Button from 'components/button';
import HeadingCaption from 'components/headingCaption';
import ProgressiveImage from 'components/progressiveImage';
import FormError from 'components/formError';
import { ToastMsg } from 'components/toastMsg';
import TopNavigator from 'components/topNavigator';
import Box from 'components/box';
import { IMAGE_URL, SCREEN_HEIGHT } from 'constants/common';
import { smallUrl, thumbnailUrl } from 'constants/commonFunctions';
import { FORGOT_PASSWORD } from 'graphql/mutations';
import { FORGOT_PASSWORD as FORGET } from 'navigation/routes';
import useErrorLog from 'hooks/useErrorLog';
import styles from './styles';

const inputsValidationSchema = () =>
  object().shape({
    email: string().email().required().label('Email'),
  });

const ForgotPassword = ({ navigation }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const { logError } = useErrorLog();

  const handleForgetPassword = async (values) => {
    setLoading(true);
    const { data, errors } = await client.mutate({
      mutation: FORGOT_PASSWORD,
      variables: { email: values.email },
    });
    setLoading(false);

    if (data && data?.forgotPassword?.ok) {
      ToastMsg(t('check_reset_email'));
      navigation.pop();
    }

    if (errors) {
      ToastMsg(t('error_occured'));
      logError({
        screen: FORGET,
        module: 'Forgot Password',
        input: JSON.stringify({ email: values.email }),
        error: JSON.stringify(errors)
      });
    }

    if (errors && errors[0]?.extensions?.exception?.code === 400) {
      ToastMsg(errors[0]?.extensions?.exception?.data?.data[0].messages[0].message);
    }
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={-(SCREEN_HEIGHT - 300)} behavior={'position'}>
      <SafeView style={styles.container}>
        <TopNavigator />
        <View style={styles.contentContainer}>
          <ProgressiveImage
            thumbnailSource={{ uri: IMAGE_URL + thumbnailUrl('/uploads/reset_password_807004bac2.png') }}
            source={{ uri: IMAGE_URL + smallUrl('/uploads/reset_password_807004bac2.png') }}
            style={styles.image}
          />
          <HeadingCaption heading={t('reset_password')} caption={t('receive_email')} />
          <View style={styles.inputsContainer}>
            <Formik
              onSubmit={(values) => handleForgetPassword(values)}
              validationSchema={inputsValidationSchema}
              initialValues={{
                email: '',
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
                    style={styles.email}
                  />
                  <Box marginBottom={-20} />
                  <FormError touched={touched.email} errorText={errors.email} />
                  <Box marginBottom={20} />
                  <Button
                    icon="unlock_alt"
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                    loading={loading}
                    style={styles.reset}
                  >
                    {t('get_reset_link')}
                  </Button>
                </>
              )}
            </Formik>
          </View>
        </View>
      </SafeView>
    </KeyboardAvoidingView>
  );
}

export default memo(ForgotPassword);
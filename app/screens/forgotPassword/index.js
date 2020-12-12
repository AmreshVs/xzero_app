import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Formik } from 'formik';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';

import SafeView from 'components/safeView';
import Textbox from 'components/textbox';
import Button from 'components/button';
import HeadingCaption from 'components/headingCaption';
import FormError from 'components/formError';
import styles from './styles';
import { ToastMsg } from 'components/toastMsg';
import { FORGOT_PASSWORD } from 'graphql/mutations';
import TopNavigator from 'components/topNavigator';
import { BASE_URL } from 'constants/common';
import useErrorLog from 'hooks/useErrorLog';
import { FORGOT_PASSWORD as FORGET } from 'navigation/routes';

const inputsValidationSchema = () =>
  object().shape({
    email: string().email().required().label('Email'),
  });

export default function ForgotPassword({ navigation }) {
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
    <SafeView style={styles.container}>
      <TopNavigator />
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: BASE_URL + '/uploads/reset_password_807004bac2.png' }}
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
                <FormError touched={touched.email} errorText={errors.email} />
                <Button
                  icon="unlock-alt"
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
  );
}

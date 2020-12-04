import React, { useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Textbox from 'components/textbox';
import FormError from 'components/formError';
import Row from 'components/row';
import Button from 'components/button';
import {
  inputsValidationSchema,
  inputs,
} from './helpers';
import { UPDATE_USER } from 'graphql/mutations';
import {
  getJWT,
  getUserData,
  handleDOB,
  handleServerDOB,
} from 'constants/commonFunctions';
import { ToastMsg } from 'components/toastMsg';
import Box from 'components/box';
import styles from './styles';

export default function EditBankInfo({ setEdit, data }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();

  const handleSave = async (values) => {
    setLoading(true);
    let jwt = await getJWT();
    let { id } = await getUserData();
    let dob = handleServerDOB(values.dob);

    let data = null;

    try {
      let { data: userData } = await client.mutate({
        mutation: UPDATE_USER,
        variables: {
          user_id: Number(id),
          email: values.email,
          mobile_number: Number(values.phone),
          dob: new Date(dob),
        },
        context: {
          headers: {
            Authorization: 'Bearer ' + jwt,
          },
        },
      });
      data = userData;
      setLoading(false);
      let user = data?.updateUser?.user || [];
      if (Object.keys(user).length) {
        setEdit(false);
      }
    } catch (error) {
      setLoading(false);
      ToastMsg('Error Occured, Please Try later!');
    }
  };

  const handleMobileNumber = (mobile_number) => {
    return String('+' + mobile_number);
  };

  return (
    <Box marginTop={-15}>
      <Formik
        onSubmit={(values) => handleSave(values)}
        validationSchema={inputsValidationSchema}
        initialValues={{
          email: data?.email,
          phone:
            data?.mobile_number === 0 ? '+971' : String(handleMobileNumber(data?.mobile_number)),
          password: '',
          repassword: '',
          dob: data?.birthday ? handleDOB(data?.birthday) : '',
        }}
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          setFieldTouched,
          setFieldValue,
          handleSubmit,
        }) => (
            <>
              {(inputs).map(
                ({ name, icon, marginTop }, index) => (
                  <View key={index}>
                    <Textbox
                      placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                      value={values[name]}
                      onChangeText={handleChange(name)}
                      icon={icon}
                      marginTop={marginTop}
                      onBlur={() => setFieldTouched(name)}
                      autoCapitalize="none"
                    />
                    <FormError touched={touched[name]} errorText={errors[name]} />
                  </View>
                )
              )}
              <Row marginTop={20} justifyContent="flex-end">
                <Button
                  width="30%"
                  size="small"
                  icon="times"
                  status="text_lite"
                  onPress={() => setEdit(false)}
                  outline
                >
                  {t('cancel')}
                </Button>
                <Box marginHorizontal={5} />
                <Button
                  width="30%"
                  size="small"
                  icon="save"
                  status="success"
                  loading={loading}
                  onPress={() => handleSubmit()}
                  outline
                >
                  {t('save')}
                </Button>
              </Row>
            </>
          )}
      </Formik>
    </Box>
  );
}
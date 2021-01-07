import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import Row from 'components/row';
import Button from 'components/button';
import Box from 'components/box';
import Textbox from 'components/textbox';
import { SCREEN_HEIGHT } from 'constants/common';
import FormError from 'components/formError';
import { ToastMsg } from 'components/toastMsg';
import { handleMobileNumber } from 'constants/commonFunctions';
import { borderRadius10, font17, marginTop10, textBoldDark, textLite } from 'constants/commonStyles';
import { UserDataContext } from 'context';
import { EDIT_ADDRESS } from 'graphql/mutations';
import useErrorLog from 'hooks/useErrorLog';
import { VOUCHER_DETAIL } from 'navigation/routes';
import { inputs, inputsValidationSchema } from './helpers';

export default function DeliveryAddress({ ...otherStyles }) {
  const { userData, setUserData } = useContext(UserDataContext);
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const client = useApolloClient();
  const { logError } = useErrorLog();

  useEffect(() => {
    if (userData !== undefined && userData?.address === null) {
      setEdit(true);
    }
  }, [userData]);

  const handleSave = async (values) => {
    if (values?.fullname?.split(" ")?.length <= 1) {
      ToastMsg('Please enter full name');
      return;
    }
    try {
      setBtnLoading(true);
      const { data, errors } = await client.mutate({
        mutation: EDIT_ADDRESS,
        variables: {
          user_id: Number(userData?.id),
          username: values?.fullname,
          address: values?.address,
        },
      });

      if (errors) {
        console.log('Edit Delivery Address', errors);
        ToastMsg(errors[0]?.extensions?.exception?.data?.data[0]?.messages[0]?.message);
        logError({
          screen: VOUCHER_DETAIL,
          module: '',
          input: JSON.stringify(),
          error: JSON.stringify(errors)
        });
      }

      setBtnLoading(false);
      if (data?.updateUserData?.user && Object.keys(data?.updateUserData?.user).length > 0) {
        setUserData(userData => ({ ...userData, ...data?.updateUserData?.user }));
        setEdit(false);
      }
    }
    catch (error) {
      console.log('Edit address error', errror);
    }
  }

  return (
    <View style={{ ...otherStyles }}>
      {!edit ?
        <Row>
          <Box flex={3}>
            <Text style={styles.title}>{t('delivery_address')}</Text>
            <Text style={styles.caption}>{userData?.username}</Text>
            <Text style={styles.caption}>{userData?.address}</Text>
            <Text style={styles.caption}>{userData?.mobile_number ? handleMobileNumber(userData?.mobile_number) : ''}</Text>
          </Box>
          <Box flex={1}>
            <Button size="small" icon="pen" onPress={() => setEdit(true)}>{t('edit')}</Button>
          </Box>
        </Row>
        :
        <Box>
          <Text style={styles.title}>{t('edit_address')}</Text>
          <Formik
            onSubmit={(values) => handleSave(values)}
            validationSchema={inputsValidationSchema}
            initialValues={{
              fullname: userData?.username || '',
              phone: userData?.mobile_number ? String(handleMobileNumber(userData?.mobile_number)) : '+971',
              address: userData?.address || '',
            }}
          >
            {({
              values,
              handleChange,
              errors,
              touched,
              setFieldTouched,
              handleSubmit,
            }) => (
              <>
                {inputs.map(({ name, icon }, index) => {
                  return (
                    <View key={index}>
                      <Textbox
                        placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                        value={values[name]}
                        onChangeText={handleChange(name)}
                        icon={icon}
                        marginTop={10}
                        onBlur={() => setFieldTouched(name)}
                        autoCapitalize="none"
                        secureTextEntry={name.includes('password', 'repassword') ? true : false}
                        multiline={name === 'address'}
                        style={name === 'address' && styles.textbox}
                      />
                      <FormError touched={touched[name]} errorText={errors[name]} />
                    </View>
                  )
                })
                }
                <Row justifyContent="flex-end" marginTop={10}>
                  {(userData?.address !== null && userData?.address !== '') &&
                    <>
                      <Button size="small" status="text_lite" width="32%" icon="times" onPress={() => setEdit(false)} outline>{t('cancel')}</Button>
                      <Box marginHorizontal={5} />
                    </>
                  }
                  <Button size="small" status="success" width="30%" icon="check" onPress={() => handleSubmit()} loading={btnLoading} outline>{t('save')}</Button>
                </Row>
              </>
            )}
          </Formik>
        </Box>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 3,
    ...textBoldDark,
    ...font17,
  },
  caption: {
    ...textLite
  },
  textbox: {
    height: SCREEN_HEIGHT / 8,
    ...marginTop10,
    ...borderRadius10,
  },
});
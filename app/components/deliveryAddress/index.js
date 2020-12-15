import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { borderRadius10, font17, marginTop10, textBoldDark, textLite } from 'constants/commonStyles';
import Row from 'components/row';
import Button from 'components/button';
import Box from 'components/box';
import Textbox from 'components/textbox';
import { SCREEN_HEIGHT } from 'constants/common';
import { Formik } from 'formik';
import { inputs, inputsValidationSchema } from './helpers';
import FormError from 'components/formError';
import Loader from 'components/loader';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_ADDRESS } from 'graphql/queries';
import { UserDataContext } from 'context';
import { handleMobileNumber } from 'constants/commonFunctions';
import { EDIT_ADDRESS } from 'graphql/mutations';
import { useTranslation } from 'react-i18next';
import useErrorLog from 'hooks/useErrorLog';
import { ToastMsg } from 'components/toastMsg';

let user = null;

export default function DeliveryAddress({ ...otherStyles }) {
  const { userData } = useContext(UserDataContext);
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const client = useApolloClient();
  const { logError } = useErrorLog();

  const mutationInput = {
    user_id: Number(userData?.id)
  };

  const { data, loading, refetch: _refetch, error } = useQuery(GET_ADDRESS, {
    variables: mutationInput
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: 'Delivery Address',
      module: 'Save Delivery Address',
      input: JSON.stringify(mutationInput),
      error: JSON.stringify(error)
    });
  }

  user = data?.user;

  useEffect(() => {
    if (user !== undefined && user?.address === null) {
      setEdit(true);
    }
  }, [user]);

  const handleSave = async (values) => {
    setBtnLoading(true);
    const { data } = await client.mutate({
      mutation: EDIT_ADDRESS,
      variables: {
        user_id: Number(userData?.id),
        username: values?.fullname,
        address: values?.address,
        mobile_number: values?.mobile_number
      }
    });
    setBtnLoading(false);
    if (Object.keys(data.updateUser.user).length > 0) {
      setEdit(false);
      _refetch();
    }
  }

  return (
    <View style={{ ...otherStyles }}>
      {!edit ?
        loading ? <Loader spinner />
          :
          <Row>
            <Box flex={3}>
              <Text style={styles.title}>{t('delivery_address')}</Text>
              <Text style={styles.caption}>{user?.username}</Text>
              <Text style={styles.caption}>{user?.address}</Text>
              <Text style={styles.caption}>{user?.mobile_number ? handleMobileNumber(user?.mobile_number) : ''}</Text>
            </Box>
            <Box flex={1}>
              <Button size="small" icon="pen" onPress={() => setEdit(true)}>Edit</Button>
            </Box>
          </Row>
        :
        loading ?
          <Loader spinner />
          :
          <Box>
            <Text style={styles.title}>{t('edit_address')}</Text>
            <Formik
              onSubmit={(values) => handleSave(values)}
              validationSchema={inputsValidationSchema}
              initialValues={{
                fullname: user?.username || '',
                phone: user?.mobile_number ? String(handleMobileNumber(user?.mobile_number)) : '+971',
                address: user?.address || '',
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
                    {(user?.address !== null && user?.address !== '') &&
                      <>
                        <Button size="small" status="text_lite" width="32%" icon="times" onPress={() => setEdit(false)} outline>Cancel</Button>
                        <Box marginHorizontal={5} />
                      </>
                    }
                    <Button size="small" status="success" width="30%" icon="check" onPress={() => handleSubmit()} loading={btnLoading} outline>Save</Button>
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
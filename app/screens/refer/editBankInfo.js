import React, { useContext, useState, memo } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Textbox from 'components/textbox';
import FormError from 'components/formError';
import Row from 'components/row';
import Button from 'components/button';
import Box from 'components/box';
import { ToastMsg } from 'components/toastMsg';
import { UserDataContext } from 'context';
import useErrorLog from 'hooks/useErrorLog';
import { CREATE_BANK_INFO, UPDATE_BANK_INFO } from 'graphql/mutations';
import { REFER } from 'navigation/routes';
import { inputsValidationSchema, inputs } from './helpers';

const EditBankInfo = ({ setEdit, data, reload }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserDataContext);
  const { logError } = useErrorLog();
  const client = useApolloClient();

  const handleSave = async (values) => {
    setLoading(true);

    let mutationData = null;
    let mutationInput = {
      id: Number(data?.id) || 0,
      user_id: Number(userData?.id),
      bank_name: values?.bank_name,
      account_number: values?.account_number,
      iban: values?.IBAN_number,
      holder_name: values?.holder_name,
    };

    try {
      let { data: bankData } = await client.mutate({
        mutation: data === null ? CREATE_BANK_INFO : UPDATE_BANK_INFO,
        variables: mutationInput,
        // context: {
        //   headers: {
        //     Authorization: 'Bearer ' + jwt,
        //   },
        // },
      });

      if (data === null) {
        mutationData = bankData?.createBankDetail?.bankDetail;
      }
      else {
        mutationData = bankData?.updateBankDetail?.bankDetail;
      }

      if (mutationData?.account_number !== '') {
        setLoading(false);
        setEdit(false);
        reload();
      }
      else {
        ToastMsg(t('error_occured'));
      }

    } catch (error) {
      console.log('Create or update bank info error', error);
      setLoading(false);
      logError({
        screen: REFER,
        module: 'Create or Update Bank Info',
        input: JSON.stringify(mutationInput),
        error: JSON.stringify(error)
      });
      ToastMsg(t('error_occured'));
    }
  };

  return (
    <Box marginTop={-15}>
      <Formik
        onSubmit={(values) => handleSave(values)}
        validationSchema={inputsValidationSchema}
        initialValues={{
          bank_name: data?.bank_name || '',
          holder_name: data?.holder_name || '',
          account_number: data?.account_number || '',
          IBAN_number: data?.iban || '',
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
            {(inputs).map(
              ({ name, icon, marginTop }, index) => {
                let newName = name.replace('_', ' ');
                return (
                  <View key={index}>
                    <Textbox
                      placeholder={newName.charAt(0).toUpperCase() + newName.slice(1)}
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
              }
            )}
            <Row marginTop={20} justifyContent="flex-end">
              {data !== null && (
                <>
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
                </>
              )}
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

export default memo(EditBankInfo);
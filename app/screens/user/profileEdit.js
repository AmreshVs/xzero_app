import React, { useState, memo, useContext } from 'react';
import { Keyboard, View } from 'react-native';
import { Formik } from 'formik';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';

import Textbox from 'components/textbox';
import FormError from 'components/formError';
import Row from 'components/row';
import Button from 'components/button';
import Checkbox from 'components/checkbox';
import { ToastMsg } from 'components/toastMsg';
import { handleDOB, handleServerDOB, getFormatedDate, getAuthenticationHeader } from 'constants/commonFunctions';
import { UserDataContext } from 'context';
import { UPDATE_USER } from 'graphql/mutations';
import { OTP, PROFILE_TAB_SCREEN } from 'navigation/routes';
import useErrorLog from 'hooks/useErrorLog';
import { inputsValidationSchema, passwordValidationSchema, inputs, passwordInputs } from './helpers';
import styles from './styles';

const ProfileEdit = ({ setEdit, data }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(data?.birthday ? new Date(data?.birthday) : new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { userData, setUserData } = useContext(UserDataContext);
  const client = useApolloClient();
  const { push } = useNavigation();
  const { logError } = useErrorLog();

  let mutationInput = {};

  const handleSave = async (values) => {
    setLoading(true);
    let dob = handleServerDOB(values.dob);
    let data = null;

    try {
      if (checked) {
        mutationInput = {
          user_id: Number(userData?.id),
          email: values.email,
          mobile_number: Number(values.phone),
          password: values.repassword || null,
          dob: new Date(dob),
        };

        let { data: updateData, errors } = await client.mutate({
          mutation: UPDATE_USER,
          variables: mutationInput,
          ...getAuthenticationHeader(userData?.jwt)
        });

        data = updateData;
        if (errors) {
          ToastMsg(errors[0]?.extensions?.exception?.data?.data[0]?.messages[0]?.message);
        }
      } else {
        mutationInput = {
          user_id: Number(userData?.id),
          email: values.email,
          mobile_number: Number(values.phone),
          dob: new Date(dob),
        };

        let { data: updateData, errors } = await client.mutate({
          mutation: UPDATE_USER,
          variables: mutationInput,
          ...getAuthenticationHeader(userData?.jwt)
        });

        data = updateData;

        if (errors) {
          ToastMsg(errors[0]?.extensions?.exception?.data?.data[0]?.messages[0]?.message);
        }
      }


      setLoading(false);
      let user = data?.updateUserData?.user || [];

      if (Object.keys(user).length) {
        let updatedUserData = { ...userData, ...data?.updateUserData?.user };
        setUserData(updatedUserData);
        setEdit(false);
        if (userData?.mobile_number !== Number(values.phone)) {
          push(OTP, {
            user_id: userData?.id,
            mobile_number: updatedUserData?.mobile_number
          });
        }
      }
    } catch (error) {
      // console.log('Update Profile error', error);
      setLoading(false);
      logError({
        screen: PROFILE_TAB_SCREEN,
        module: 'Edit profile',
        input: JSON.stringify(mutationInput),
        error: JSON.stringify(error)
      });
    }
  };

  const handleChecked = () => {
    setChecked(!checked);
  };

  const handleMobileNumber = (mobile_number) => {
    return String('+' + mobile_number);
  };

  return (
    <View style={styles.inputsContainer}>
      <Formik
        onSubmit={(values) => handleSave(values)}
        validationSchema={checked ? passwordValidationSchema : inputsValidationSchema}
        initialValues={{
          email: data?.email,
          phone:
            (data?.mobile_number === 0 || data?.mobile_number === null) ? '+971' : String(handleMobileNumber(data?.mobile_number)),
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
            {(checked ? [...inputs, ...passwordInputs] : inputs).map(
              ({ name, icon, marginTop }, index) => (
                <View key={index}>
                  <Textbox
                    placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                    value={values[name]}
                    onChangeText={handleChange(name)}
                    icon={icon}
                    marginTop={marginTop}
                    keyboardType={name === 'phone' ? 'phone-pad' : 'default'}
                    showSoftInputOnFocus={name === 'dob' ? false : true}
                    onBlur={() => setFieldTouched(name)}
                    autoCapitalize="none"
                    secureTextEntry={name.includes('password', 'repassword') ? true : false}
                    onTouchStart={() => name === 'dob' && (setDatePickerVisibility(true) && Keyboard.dismiss())}
                  />
                  <FormError touched={touched[name]} errorText={errors[name]} />
                </View>
              )
            )}
            {!checked && (
              <Row marginTop={20}>
                <Checkbox
                  label={t('edit_password')}
                  checked={checked}
                  handleChecked={handleChecked}
                />
              </Row>
            )}
            <Row marginTop={20} spaceBetween>
              <Button
                width="48%"
                icon="times"
                status="text_lite"
                onPress={() => setEdit(false)}
                outline
              >
                {t('cancel')}
              </Button>
              <Button
                width="48%"
                icon="save"
                status="success"
                loading={loading}
                onPress={() => handleSubmit()}
                outline
              >
                {t('save')}
              </Button>
            </Row>
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
            />
          </>
        )}
      </Formik>
    </View>
  );
}

export default memo(ProfileEdit);
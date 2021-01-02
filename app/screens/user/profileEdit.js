import React, { useState, memo, useContext } from 'react';
import { View } from 'react-native';
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
import { handleDOB, handleServerDOB, getFormatedDate } from 'constants/commonFunctions';
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

  const handleSave = async (values) => {
    setLoading(true);
    let dob = handleServerDOB(values.dob);

    let data = null;

    try {
      if (checked) {
        let { data: updateData } = await client.mutate({
          mutation: UPDATE_USER,
          variables: {
            user_id: Number(userData?.id),
            email: values.email,
            mobile_number: Number(values.phone),
            password: values.repassword || null,
            dob: dob,
          },
          // context: {
          //   headers: {
          //     Authorization: 'Bearer ' + userData?.jwt,
          //   },
          // },
        });
        data = updateData;
      } else {
        let { data: updateData } = await client.mutate({
          mutation: UPDATE_USER,
          variables: {
            user_id: Number(userData?.id),
            email: values.email,
            mobile_number: Number(values.phone),
            dob: new Date(dob),
          },
          // context: {
          //   headers: {
          //     Authorization: 'Bearer ' + userData?.jwt,
          //   },
          // },
        });
        data = updateData;
      }

      setLoading(false);
      let user = data?.updateUser?.user || [];

      if (Object.keys(user).length) {
        let updatedUserData = { ...userData, ...data?.updateUser?.user };
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
      console.log('Update Profile error', error);
      setLoading(false);
      ToastMsg(t('error_occured'));
      logError({
        screen: PROFILE_TAB_SCREEN,
        module: 'Edit profile',
        input: JSON.stringify(values),
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
            {(checked ? [...inputs, ...passwordInputs] : inputs).map(
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
                    secureTextEntry={name.includes('password', 'repassword') ? true : false}
                    onTouchStart={() => name === 'dob' && setDatePickerVisibility(true)}
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
              isDarkModeEnabled={false}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

export default memo(ProfileEdit);
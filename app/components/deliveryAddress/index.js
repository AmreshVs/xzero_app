import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { borderRadius10, font17, marginBottom10, marginTop10, textBoldDark, textLite } from 'constants/commonStyles';
import Row from 'components/row';
import Button from 'components/button';
import Box from 'components/box';
import Textbox from 'components/textbox';
import { SCREEN_HEIGHT } from 'constants/common';
import { Formik } from 'formik';
import { inputs, inputsValidationSchema } from './helpers';
import FormError from 'components/formError';

export default function DeliveryAddress({ ...otherStyles }) {
  const [edit, setEdit] = useState(false);

  const handleSave = () => {

  }

  return (
    <View style={{ ...otherStyles }}>
      {!edit ?
        <Row>
          <Box flex={3}>
            <Text style={styles.title}>Delivery Address</Text>
            <Text style={styles.caption}>{'Amresh Vs'}</Text>
            <Text style={styles.caption}>{'12, Downtown, Near Burj Khalifa, Dubai'}</Text>
            <Text style={styles.caption}>{'+971565255257'}</Text>
          </Box>
          <Box flex={1}>
            <Button size="small" icon="pen" onPress={() => setEdit(true)}>Edit</Button>
          </Box>
        </Row>
        :
        <Box>
          <Text style={styles.title}>Edit Address</Text>
          <Formik
            onSubmit={(values) => handleSave(values)}
            validationSchema={inputsValidationSchema}
            initialValues={{
              fullname: '',
              phone: '+971',
              address: '',
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
                    <Button size="small" status="text_lite" width="32%" icon="times" onPress={() => setEdit(false)} outline>Cancel</Button>
                    <Box marginHorizontal={5} />
                    <Button size="small" status="success" width="30%" icon="check" onPress={() => handleSubmit()} outline>Save</Button>
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
import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { object, string } from 'yup';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Button from 'components/button';
import colors from 'constants/colors';
import FormError from 'components/formError';
import { SCREEN_HEIGHT } from 'constants/common';
import Card from 'components/card';

const inputsValidationSchema = () =>
  object().shape({
    search: string().required().label('Search'),
  });

const SearchModal = ({ heading, placeholder, searched, modalizeRef, handleSearch }) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  let name = 'search';

  return (
    <Modalize
      ref={modalizeRef}
      childrenStyle={styles.modal}
      modalHeight={(SCREEN_HEIGHT / 2) + insets.bottom}
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
    >
      <Card margin={10} paddingBottom={15}>
        <Text style={styles.heading}>{heading}</Text>
        <Formik
          onSubmit={(values) => handleSearch(values.search)}
          validationSchema={inputsValidationSchema}
          initialValues={{
            search: String(searched) || '',
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
              <Row justifyContent="space-between">
                <Box width="68%">
                  <Textbox
                    placeholder={placeholder}
                    value={values[name]}
                    onChangeText={handleChange(name)}
                    icon="search"
                    marginTop={0}
                    onBlur={() => setFieldTouched(name)}
                    autoCapitalize="none"
                  />
                </Box>
                <Box width="30%">
                  <Button
                    icon="check"
                    onPress={() => handleSubmit()}
                    disabled={Object.keys(errors).length}
                  >
                    {t('search')}
                  </Button>
                </Box>
              </Row>
              <FormError touched={touched[name]} errorText={errors[name]} />
            </>
          )}
        </Formik>
      </Card>
    </Modalize>
  );
};

export default memo(SearchModal);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.lite_gray,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heading: {
    fontWeight: '700',
    color: colors.text_dark,
    fontSize: 17,
    marginBottom: 5
  }
});
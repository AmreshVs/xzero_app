import React, { useState } from 'react';
import { Text } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { object, string } from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import Box from 'components/box';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Button from 'components/button';
import FormError from 'components/formError';
import { SCREEN_HEIGHT } from 'constants/common';
import Card from 'components/card';
import { HOME_SEARCH } from 'graphql/queries';
import styles from './styles';
import ListItem from './listItem';
import ModalSearchHeader from 'components/modalSearchHeader';

const inputsValidationSchema = () =>
  object().shape({
    search: string().required().label('Search'),
  });

const SearchModal = ({ modalizeRef }) => {
  const [searched, setSearched] = useState('');
  const { t, i18n } = useTranslation();
  let language = i18n.language;
  const initialWhereCondition = {
    where: {
      [`title_${language}_eq`]: ""
    },
    swhere: {
      [`name_${language}_eq`]: ""
    }
  };
  const [whereCondition, setWhereCondition] = useState(initialWhereCondition);
  const { data, loading } = useQuery(HOME_SEARCH, {
    variables: whereCondition
  });

  let name = 'search';

  const handleSearch = (value) => {
    setSearched(value);
    setWhereCondition({
      where: {
        [`title_${language}_contains`]: value
      },
      swhere: {
        [`name_${language}_contains`]: value
      }
    });
  }

  const handleClear = () => {
    setSearched('');
    setWhereCondition(initialWhereCondition);
  }

  return (
    <Modalize
      ref={modalizeRef}
      childrenStyle={styles.modal}
      modalTopOffset={150}
      snapPoint={SCREEN_HEIGHT / 2}
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
    >
      <Card margin={10}>
        <Text style={styles.heading}>{t('search_home')}</Text>
        <Formik
          onSubmit={(values) => handleSearch(values.search)}
          validationSchema={inputsValidationSchema}
          enableReinitialize
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
                      placeholder={t('search_home_textbox')}
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
      <Card margin={10} marginTop={0}>
        <Text style={styles.heading}>Search Results</Text>
        {searched !== '' && <ModalSearchHeader handleClear={handleClear} searched={searched || ""} marginTop={-5} />}
        <Box loading={loading}>
          {data !== undefined && (
            <>
              {((data.centers !== undefined && data?.centers.length === 0) && (data?.offers !== undefined && data?.offers.length === 0) && (data?.specialists !== undefined && data?.specialists.length === 0)) ?
                <Text style={styles.caption}>No search result found!</Text>
                :
                <>
                  <ListItem name="Centers" data={data?.centers} />
                  <ListItem name="Offers" data={data?.offers} />
                  <ListItem name="Specialists" data={data?.specialists} />
                </>
              }
            </>
          )}
        </Box>
      </Card>
    </Modalize>
  );
};

export default SearchModal;
import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Button from 'components/button';
import Row from 'components/row';
import styles from '../../screens/centers/styles';

export const ModalSearchHeader = ({ handleClear, searched, ...otherStyles }) => {
  const { t } = useTranslation();

  return (
    <Row alignItems="center" justifyContent="center" {...otherStyles}>
      <Text style={styles.searchCaption}>
        <Text>{t('searched_for')} </Text>
        <Text style={styles.searchedText}>"{String(searched || '')}"</Text>
      </Text>
      <Button
        width={80}
        status="danger"
        size="small"
        icon="times"
        onPress={() => handleClear()}
      >
        {t('clear')}
      </Button>
    </Row>
  );
};

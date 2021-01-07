import React, { memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Row from 'components/row';
import Card from 'components/card';
import styles from './styles';

const AvailDiscount = ({ data }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Row marginTop={10}>
      <Card style={styles.descContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {t('avail_discount')}
        </Text>
        <Text style={styles.descText}>
          {data?.[`text_${language}`]}
        </Text>
      </Card>
    </Row>
  );
};

export default memo(AvailDiscount);
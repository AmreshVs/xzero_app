import React, { memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import styles from './styles';

const Rules = ({ data }) => {
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  return (
    <Card style={styles.rulesContainer} marginBottom={10}>
      <Text style={styles.title}>{t('rules')}</Text>
      <Text style={styles.caption}>
        {data?.[`title_${language}`]}
      </Text>
    </Card>
  )
}

export default memo(Rules);
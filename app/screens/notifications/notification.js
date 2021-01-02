import React, { memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import styles from './styles';

const Notification = (data) => {
  let {
    i18n: { language },
  } = useTranslation();

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>{data?.[`title_${language}`]}</Text>
      <Text style={styles.desc}>{data?.[`desc_${language}`]}</Text>
      <Text style={styles.timestamp}>{new Date(data?.created_at).toLocaleString()}</Text>
    </Card>
  );
}

export default memo(Notification);
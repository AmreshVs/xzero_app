import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import Card from 'components/card';

export default function Notification(data) {
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

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    color: colors.text_dark,
  },
  desc: {
    color: colors.text_lite,
    marginTop: 5,
  },
  timestamp: {
    color: colors.text_lite,
    marginTop: 5,
    textAlign: 'right',
  },
});

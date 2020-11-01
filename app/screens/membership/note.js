import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import Card from 'components/card';

export default function Note({ data }) {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Card style={styles.container}>
      <Text style={styles.text}>{data?.[`text_${language}`]}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  text: {
    color: colors.text_lite,
  },
});

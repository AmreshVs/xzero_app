import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import Card from 'components/card';

export default function Benefits({ data }) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>{t('benefits')}</Text>
      {data?.[`text_${language}`].split('\n').map((benefit, index) => {
        if (benefit !== '') {
          return (
            <Text style={styles.text} key={index}>
              {index + 1 + '. ' + benefit}
            </Text>
          );
        }
        return null;
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  title: {
    fontWeight: '700',
    color: colors.text_dark,
  },
  text: {
    color: colors.text_lite,
    marginTop: 5,
  },
});

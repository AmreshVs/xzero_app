import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import styles from './styles';

export default function Rules({ data }) {
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  return (
    <Card marginBottom={10}>
      <Text style={styles.title}>{t('rules')}</Text>
      {data?.[`title_${language}`].split('\n').map((rule, index) => {
        if (rule !== '') {
          return (
            <Text style={styles.caption} key={index}>
              {index + 1 + '. ' + rule}
            </Text>
          );
        }
        return null;
      })}
    </Card>
  )
}
import React, { memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import styles from './styles';

const Benefits = ({ data }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Card style={styles.benefitsContainer}>
      <Text style={styles.benefitsTitle}>{t('benefits')}</Text>
      {data?.[`text_${language}`].split('\n').map((benefit, index) => {
        if (benefit !== '') {
          return (
            <Text style={styles.benefitsText} key={index}>
              {index + 1 + '. ' + benefit}
            </Text>
          );
        }
        return null;
      })}
    </Card>
  );
}

export default memo(Benefits);
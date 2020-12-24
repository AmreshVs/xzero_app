import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Row from 'components/row';
import Card from 'components/card';
import styles from './styles';
import { memo } from 'react';

const AvailDiscount = ({ loading, data }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Row marginTop={10}>
      <Card style={styles.descContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {t('avail_discount')}
        </Text>
        {loading === false &&
          data?.membershipBenefit?.[`text_${language}`].split('\n').map((benefit, index) => {
            if (benefit !== '') {
              return (
                <Text style={styles.descText} key={index}>
                  {index + 1 + '. ' + benefit}
                </Text>
              );
            }
            return null;
          })}
      </Card>
    </Row>
  );
};

export default memo(AvailDiscount);
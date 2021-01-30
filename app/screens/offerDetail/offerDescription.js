import React, { memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Row from 'components/row';
import Card from 'components/card';
import { FadeInUpAnim } from 'animation';
import styles from './styles';

const OfferDescription = ({ offer }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <FadeInUpAnim delay={300}>
      <Row marginTop={10}>
        <Card style={styles.descContainer} shadow={false}>
          <Text style={styles.title} numberOfLines={2}>
            {t('description')}
          </Text>
          <Text style={styles.descText}>{offer?.[`desc_${language}`]}</Text>
        </Card>
      </Row>
    </FadeInUpAnim>
  );
};

export default memo(OfferDescription);
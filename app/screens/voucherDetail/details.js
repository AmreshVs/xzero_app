import React, { memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import Box from 'components/box';
import { FadeInUpAnim } from 'animation';
import styles from './styles';

const Details = ({ data }) => {
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  return (
    <FadeInUpAnim delay={100}>
      <Card marginBottom={10}>
        <Text style={styles.title} numberOfLines={1}>
          {t('details')}
        </Text>
        <Box>
          <Text style={styles.caption}>{data?.[`desc_${language}`]}</Text>
        </Box>
      </Card>
    </FadeInUpAnim>
  );
};

export default memo(Details);
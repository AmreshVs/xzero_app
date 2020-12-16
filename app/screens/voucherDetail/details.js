import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import Box from 'components/box';
import styles from './styles';

const Details = ({ data }) => {
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  return (
    <Card marginBottom={10}>
      <Text style={styles.title} numberOfLines={1}>
        {t('details')}
      </Text>
      <Box>
        <Text style={styles.caption}>{data?.[`desc_${language}`]}</Text>
      </Box>
    </Card>
  );
};

export default Details;
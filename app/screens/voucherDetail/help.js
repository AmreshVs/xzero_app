import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import Button from 'components/button';
import Card from 'components/card';
import Box from 'components/box';
import { dialNumber } from 'constants/commonFunctions';
import styles from './styles';

const Help = () => {
  const { t } = useTranslation();

  return (
    <Card style={styles.helpContainer} marginBottom={70}>
      <Text style={styles.title} numberOfLines={1}>
        {t('need_help')}
      </Text>
      <Box marginTop={10}>
        <Button
          status="success"
          icon={faWhatsapp}
          onPress={() => dialNumber(971565255257)}
        >
          {t('whatsapp')}
        </Button>
      </Box>
    </Card>
  );
};

export default Help;
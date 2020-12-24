import React, { useContext } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import Button from 'components/button';
import Card from 'components/card';
import Box from 'components/box';
import { sendWhatsappMessage } from 'constants/commonFunctions';
import { UserDataContext } from 'context';
import styles from './styles';
import { memo } from 'react';

const Help = () => {
  const { t } = useTranslation();
  const { userData } = useContext(UserDataContext);

  const getWhatsappMessage = () => {
    return `${t('whatsapp1')} ${userData?.username} ${t('whatsapp3')}`;
  };

  return (
    <Card style={styles.helpContainer} marginBottom={70}>
      <Text style={styles.title} numberOfLines={1}>
        {t('need_help')}
      </Text>
      <Box marginTop={10}>
        <Button
          status="success"
          icon={faWhatsapp}
          onPress={() =>
            sendWhatsappMessage(getWhatsappMessage(), handleMobileNumber(971565255256))
          }
        >
          {t('whatsapp')}
        </Button>
      </Box>
    </Card>
  );
};

export default memo(Help);
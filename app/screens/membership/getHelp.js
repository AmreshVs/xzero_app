import React, { useContext, memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import Row from 'components/row';
import Card from 'components/card';
import Button from 'components/button';
import { sendWhatsappMessage, handleMobileNumber } from 'constants/commonFunctions';
import { WHATSAPP_CONTACT } from 'constants/common';
import { UserDataContext } from 'context';
import styles from './styles';

const GetHelp = () => {
  const { t } = useTranslation();
  const { userData } = useContext(UserDataContext);

  const getWhatsappMessage = () => {
    return `${t('whatsapp1')} ${userData?.username} ${t('whatsapp3')}`;
  };

  return (
    <Row style={styles.helpContainer}>
      <Card style={styles.infoContainer}>
        <Text style={styles.about} numberOfLines={1}>
          {t('help_membership')}
        </Text>
        <Text style={styles.helpCaption}>{t('membership_difficulties')}</Text>
        <Button
          status="success"
          icon={faWhatsapp}
          disabled={!userData?.username}
          onPress={() =>
            sendWhatsappMessage(getWhatsappMessage(), handleMobileNumber(WHATSAPP_CONTACT))
          }
        >
          {t('connect_whatsapp')}
        </Button>
      </Card>
    </Row>
  );
}

export default memo(GetHelp);
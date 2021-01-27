import React, { memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Row from 'components/row';
import Card from 'components/card';
import Button from 'components/button';
import { sendWhatsappMessage, handleMobileNumber, useReduxAction } from 'constants/commonFunctions';
import { WHATSAPP_CONTACT } from 'constants/common';
import styles from './styles';

const GetHelp = () => {
  const { t } = useTranslation();
  const userData = useReduxAction(state => state?.userReducer?.user);

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
          icon="whatsapp"
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
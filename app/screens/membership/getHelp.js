import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import Row from 'components/row';
import Card from 'components/card';
import Button from 'components/button';
import { sendWhatsappMessage, handleMobileNumber } from 'constants/commonFunctions';
import useUserData from 'hooks/useUserData';
import colors from 'constants/colors';

export default function GetHelp() {
  const { t } = useTranslation();
  const userData = useUserData();

  const getWhatsappMessage = () => {
    return `${t('whatsapp1')} ${userData?.username} ${t('whatsapp3')}`;
  };

  return (
    <Row style={styles.container}>
      <Card style={styles.infoContainer}>
        <Text style={styles.about} numberOfLines={1}>
          {t('help_membership')}
        </Text>
        <Text style={styles.caption}>{t('membership_difficulties')}</Text>
        <Button
          style={styles.callButton}
          status="success"
          icon={faWhatsapp}
          disabled={!userData?.username}
          onPress={() =>
            sendWhatsappMessage(getWhatsappMessage(), handleMobileNumber(971565255256))
          }
        >
          {t('connect_whatsapp')}
        </Button>
      </Card>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  infoContainer: {
    width: '100%',
  },
  callButton: {},
  about: {
    color: colors.text_dark,
    textAlign: 'left',
    fontWeight: '700',
    marginBottom: 5,
  },
  caption: {
    color: colors.text_lite,
    marginBottom: 5,
  },
});

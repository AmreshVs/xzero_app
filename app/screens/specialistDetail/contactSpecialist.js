import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import Row from 'components/row';
import Button from 'components/button';
import Card from 'components/card';
import { sendWhatsappMessage, handleMobileNumber } from 'constants/commonFunctions';
import styles from './styles';

const ContactSpecialist = ({ specialist, userData }) => {
  const { t } = useTranslation();

  const getWhatsappMessage = () => {
    return `${t('whatsapp1')} ${userData?.username} ${t('whatsapp2')}`;
  };

  return (
    <Card marginVertical={10} style={styles.infoContainer}>
      <Row>
        <Text style={styles.about} numberOfLines={1}>
          {t(`contact`)}
        </Text>
        <Button
          style={styles.callButton}
          status="success"
          icon={faWhatsapp}
          disabled={!userData?.username || specialist?.mobile_number === null}
          onPress={() => sendWhatsappMessage(
            getWhatsappMessage(),
            handleMobileNumber(specialist?.mobile_number)
          )}
        >
          {t('connect_whatsapp')}
        </Button>
      </Row>
    </Card>
  );
};

export default ContactSpecialist;
import React, { memo } from 'react';
import { Image, View, Text } from 'react-native';

import Card from 'components/card';
import styles from './styles';
import { IMAGE_URL } from 'constants/common';
import { useTranslation } from 'react-i18next';

const QRCode = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Card style={styles.qrContainer} margin={10} marginBottom={0}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: IMAGE_URL + data?.qrcode_url }} style={styles.qrcode} />
        <Text style={styles.helpCaption}>{t('center_scan')}</Text>
      </View>
    </Card>
  )
}

export default memo(QRCode);
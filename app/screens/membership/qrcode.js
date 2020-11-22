import React from 'react';
import { Image, View, Text } from 'react-native';

import Card from 'components/card';
import styles from './styles';
import { IMAGE_URL } from 'constants/common';
import { useTranslation } from 'react-i18next';

export default function QRCode({ data }) {
  const { t } = useTranslation();

  return (
    <Card margin={10} marginBottom={0}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: 'http://localhost:1337' + data?.qrcode_url }} style={styles.qrcode} />
        <Text style={styles.helpCaption}>{t('center_scan')}</Text>
      </View>
    </Card>
  )
}
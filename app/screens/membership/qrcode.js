import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import ProgressiveImage from 'components/progressiveImage';
import { IMAGE_URL } from 'constants/common';
import { ScaleAnim } from 'animation';
import styles from './styles';

const QRCode = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Card style={styles.qrContainer} margin={10} marginBottom={0}>
      <View style={styles.imageContainer}>
        <ScaleAnim>
          <ProgressiveImage
            style={styles.qrcode}
            source={{ uri: IMAGE_URL + data?.qrcode_url }}
          />
        </ScaleAnim>
        <Text style={styles.helpCaption}>{t('center_scan')}</Text>
      </View>
    </Card>
  )
}

export default memo(QRCode);
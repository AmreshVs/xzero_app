import React from 'react';
import { Image, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import Box from 'components/box';
import Button from 'components/button';
import Row from 'components/row';
import Progress from 'components/progress';
import { IMAGE_URL } from 'constants/common';
import { calculatePercentage } from 'constants/commonFunctions';
import styles from './styles';

export default function VoucherInfo({ data }) {
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  return (
    <Card style={styles.voucherContainer}>
      <View style={styles.voucherImageContainer}>
        <Image source={{ uri: IMAGE_URL + data?.featured_img?.url }} style={styles.voucherImg} />
      </View>
      <Row padding={10} paddingBottom={5}>
        <Box width="70%">
          <Text numberOfLines={1}>
            <Text style={styles.title}>{t('buy')} </Text>
            <Text style={styles.caption}>{data?.[`buy_title_${language}`]}</Text>
          </Text>
          <Text numberOfLines={1}>
            <Text style={styles.title}>{t('win')} </Text>
            <Text style={styles.caption} numberOfLines={1}>{data?.[`win_title_${language}`]}</Text>
          </Text>
        </Box>
        <Box width="30%" marginTop={2}>
          <Button status="chip_1" size="small" icon="share-alt">{t('share')}</Button>
        </Box>
      </Row>
      <Box padding={10} paddingTop={5}>
        <Progress percent={calculatePercentage(data?.total_bought, data?.limit)} countText={`${data?.total_bought} ${t('out of')} ${data?.limit}`} colorful />
      </Box>
      <Box padding={10} paddingTop={0}>
        <Text style={styles.caption}>{t('check_below_for_more')}</Text>
      </Box>
    </Card>
  )
}
import React from 'react';
import { Image, Share, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import Box from 'components/box';
import Button from 'components/button';
import Row from 'components/row';
import Progress from 'components/progress';
import { IMAGE_URL } from 'constants/common';
import { calculatePercentage, isTab } from 'constants/commonFunctions';
import styles from './styles';
import Chip from 'components/chip';
import colors from 'constants/colors';

export default function VoucherInfo({ data }) {
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  const handleShare = async () => {
    try {
      const message = `${t('buy')} - ${data?.[`buy_title_${language}`]}\n${t('win')} - ${data?.[`win_title_${language}`]}\n\nBuy this voucher at ${data?.cost} ${t('aed')}\n\nCheck the Voucher on Xzero App\nhttps://xzero.app/open?q=xzero://Home/VoucherDetail?id=1`;
      await Share.share({
        message: message,
        title: message,
        subject: message,
        dialogTitle: 'Join this amazing draw and win exciting prize'
      });
    } catch (error) {
      console.log('Share draw error', error);
    }
  }

  return (
    <Card style={styles.voucherContainer}>
      <View style={styles.voucherImageContainer}>
        {['closed', 'publish'].includes(data?.draw_status) && (
          <>
            <View style={styles.closedContainer}>
              <Chip
                color={data?.draw_status === 'closed' ? colors.danger : colors.success}
                title={data?.draw_status === 'closed' ? t('draw_closed') : t('draw_publish')}
              />
            </View>
            <View style={styles.closed} />
          </>
        )}
        <Image source={{ uri: IMAGE_URL + data?.featured_img?.url }} style={styles.voucherImg} />
      </View>
      <Row padding={10} paddingBottom={5}>
        <Box width="100%">
          <Text numberOfLines={1}>
            <Text style={styles.title}>{t('buy')} </Text>
            <Text style={styles.caption}>{data?.[`buy_title_${language}`]}</Text>
          </Text>
          <Text numberOfLines={1}>
            <Text style={styles.title}>{t('win')} </Text>
            <Text style={styles.caption} numberOfLines={1}>{data?.[`win_title_${language}`]}</Text>
          </Text>
        </Box>
      </Row>
      <Box padding={10} paddingTop={5}>
        <Progress percent={calculatePercentage(data?.total_bought, data?.limit)} countText={`${data?.total_bought} ${t('out of')} ${data?.limit}`} colorful />
      </Box>
      <Box padding={10} paddingTop={0}>
        <Text style={styles.caption}>{t('check_below_for_more')}</Text>
      </Box>
      <Box padding={10} paddingTop={0} alignItems="flex-end">
        <Button width={isTab() ? "50%" : "100%"} status="chip_1" size="small" icon="share-alt" onPress={() => handleShare()}>{t('share')}</Button>
      </Box>
    </Card>
  )
}
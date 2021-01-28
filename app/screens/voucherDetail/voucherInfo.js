import React, { memo } from 'react';
import { Share, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import Box from 'components/box';
import Button from 'components/button';
import Row from 'components/row';
import Progress from 'components/progress';
import Chip from 'components/chip';
import ProgressiveImage from 'components/progressiveImage';
import { IMAGE_URL } from 'constants/common';
import colors from 'constants/colors';
import { calculatePercentage, isTab, thumbnailUrl, useReduxAction } from 'constants/commonFunctions';
import { FadeInUpAnim, ScaleAnim } from 'animation';
import styles from './styles';

const VoucherInfo = ({ data }) => {
  const { t, i18n } = useTranslation();
  const userData = useReduxAction(state => state?.userReducer?.user);
  let language = i18n.language;

  const handleShare = async () => {
    try {
      const message = `${t('buy')} - ${data?.[`buy_title_${language}`]}\n${t('win')} - ${data?.[`win_title_${language}`]}\n\n${t('buy_voucher_at')} ${(!userData || userData?.membership === null) ? data?.cost_for_non_members : data?.cost} ${t('aed')}\n\n${t('check_voucher')}\nhttps://xzero.app/open?q=xzero://DHome/Main/VoucherDetail?id=${data?.id}`;
      await Share.share({
        message: message,
        title: message,
        subject: message,
        dialogTitle: 'Join this amazing draw and win exciting prize'
      });
    } catch (error) {
      // console.log('Share draw error', error);
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
        <ScaleAnim>
          <ProgressiveImage
            preview={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img?.url) }}
            source={{ uri: IMAGE_URL + data?.featured_img?.url }}
            style={styles.voucherImg}
          />
        </ScaleAnim>
      </View>
      <Row padding={10} paddingBottom={5}>
        <Box width="100%">
          <FadeInUpAnim>
            <Text numberOfLines={1}>
              <Text style={styles.title}>{t('buy')} </Text>
              <Text style={styles.caption}>{data?.[`buy_title_${language}`]}</Text>
              {(!userData || userData?.membership === null) && <Text style={styles.caption}> + {data?.membership_plans[0]?.[`name_${language}`]} {t('membership')}</Text>}
            </Text>
          </FadeInUpAnim>
          <FadeInUpAnim delay={100}>
            <Text numberOfLines={1}>
              <Text style={styles.title}>{t('win')} </Text>
              <Text style={styles.caption} numberOfLines={1}>{data?.[`win_title_${language}`]}</Text>
            </Text>
          </FadeInUpAnim>
        </Box>
      </Row>
      <Box padding={10} paddingTop={5}>
        <FadeInUpAnim delay={150}>
          <Progress percent={calculatePercentage(data?.total_bought, data?.limit)} countText={`${data?.total_bought} ${t('out of')} ${data?.limit}`} colorful />
        </FadeInUpAnim>
      </Box>
      <Box padding={10} paddingTop={0}>
        <FadeInUpAnim delay={200}>
          <Text style={styles.caption}>{t('check_below_for_more')}</Text>
        </FadeInUpAnim>
      </Box>
      <ScaleAnim>
        <Box padding={10} paddingTop={0} alignItems="flex-end">
          <Button width={isTab() ? "20%" : "100%"} status="chip_1" size="small" icon="share_alt" onPress={() => handleShare()}>{t('share')}</Button>
        </Box>
      </ScaleAnim>
    </Card>
  )
}

export default memo(VoucherInfo);
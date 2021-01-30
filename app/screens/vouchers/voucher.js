import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Card from 'components/card';
import Box from 'components/box';
import Button from 'components/button';
import Row from 'components/row';
import Progress from 'components/progress';
import Divider from 'components/divider';
import RippleFX from 'components/rippleFx';
import Chip from 'components/chip';
import ProgressiveImage from 'components/progressiveImage';
import { IMAGE_URL } from 'constants/common';
import colors from 'constants/colors';
import { calculatePercentage, smallUrl, thumbnailUrl, useReduxAction } from 'constants/commonFunctions';
import { VOUCHER_DETAIL } from 'navigation/routes';
import styles from './styles';
import { FadeAnim, FadeInUpAnim, ScaleAnim } from 'animation';

const Voucher = ({ data, handleOpenModal }) => {
  const { push } = useNavigation();
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  const handleVoucherDetailNavigation = () => {
    push(VOUCHER_DETAIL, { id: data?.id });
  }

  return (
    <Card style={styles.voucherContainer}>
      <View style={styles.voucherImageContainer}>
        <RippleFX onPress={() => handleVoucherDetailNavigation()}>
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
          <FadeAnim>
            <ProgressiveImage
              thumbnailSource={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img?.url) }}
              source={{ uri: IMAGE_URL + smallUrl(data?.featured_img?.url) }}
              style={styles.voucherImg}
            />
          </FadeAnim>
          <FadeInUpAnim style={styles.costContainer} delay={100}>
            <Text style={styles.cost}>{(!userData || userData?.membership === null) ? data?.cost_for_non_members : data?.cost || 0} {t('aed')}</Text>
          </FadeInUpAnim>
        </RippleFX>
      </View>
      <Row padding={10} paddingBottom={5}>
        <Box width="70%">
          <RippleFX onPress={() => handleVoucherDetailNavigation()}>
            <FadeAnim delay={200}>
              <Text numberOfLines={1}>
                <Text style={styles.title}>{t('buy')} </Text>
                <Text style={styles.caption}>{data?.[`buy_title_${language}`]}</Text>
                {(!userData || userData?.membership === null) && <Text style={styles.caption}> + {data?.membership_plans[0]?.[`name_${language}`]} {t('membership')}</Text>}
              </Text>
              <Text numberOfLines={1}>
                <Text style={styles.title}>{t('win')} </Text>
                <Text style={styles.caption} numberOfLines={1}>{data?.[`win_title_${language}`]}</Text>
              </Text>
            </FadeAnim>
          </RippleFX>
        </Box>
        <Box width="30%" marginTop={2}>
          <ScaleAnim delay={1000}>
            <Button
              size="small"
              icon="money_bill"
              onPress={() => {
                handleOpenModal(data);
              }}
              disabled={['closed', 'publish'].includes(data?.draw_status)}
            >
              {t('buy_now')}
            </Button>
          </ScaleAnim>
        </Box>
      </Row>
      <Divider />
      <Box padding={10} paddingTop={5}>
        <FadeAnim>
          <Progress percent={calculatePercentage(data?.total_bought, data?.limit)} countText={`${data?.total_bought} ${t('out of')} ${data?.limit}`} colorful />
        </FadeAnim>
      </Box>
    </Card>
  )
}

export default memo(Voucher);
import React, { memo } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import Box from 'components/box';
import Row from 'components/row';
import RippleFX from 'components/rippleFx';
import ProgressiveImage from 'components/progressiveImage';
import { thumbnailUrl } from 'constants/commonFunctions';
import { IMAGE_URL } from 'constants/common';
import { VOUCHER_DETAIL } from 'navigation/routes';
import styles from './styles';

const VoucherList = ({ data }) => {
  const { t, i18n } = useTranslation();
  const { navigate } = useNavigation();
  const language = i18n.language;
  const voucher = data?.voucher;

  return (
    <Card style={styles.voucherList}>
      <RippleFX onPress={() => navigate(VOUCHER_DETAIL, { id: voucher?.id })}>
        <Row>
          <Box width="30%">
            <ProgressiveImage
              style={styles.voucherImage}
              source={{ uri: IMAGE_URL + thumbnailUrl(voucher?.featured_img?.url) }}
            />
          </Box>
          <Box width="70%" paddingHorizontal={10}>
            <Text numberOfLines={1}>
              <Text style={styles.title}>{t('buy')} </Text>
              <Text style={styles.caption}>{voucher?.[`buy_title_${language}`]}</Text>
            </Text>
            <Text numberOfLines={1}>
              <Text style={styles.title}>{t('win')} </Text>
              <Text style={styles.caption} numberOfLines={1}>{voucher?.[`win_title_${language}`]}</Text>
            </Text>
            <Text style={styles.cost}>{data?.paid_amount || 0} {t('aed')}</Text>
          </Box>
        </Row>
      </RippleFX>
    </Card>
  )
}

export default memo(VoucherList);
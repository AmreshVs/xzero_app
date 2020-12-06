import React from 'react';
import { Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import { IMAGE_URL } from 'constants/common';
import Box from 'components/box';
import Row from 'components/row';
import RippleFX from 'components/rippleFx';
import { VOUCHER_DETAIL } from 'navigation/routes';
import styles from './styles';

export default function VoucherList({ data }) {
  const { t, i18n } = useTranslation();
  const { push } = useNavigation();
  const language = i18n.language;
  const voucher = data?.voucher;

  return (
    <Card style={styles.voucherList}>
      <RippleFX onPress={() => push(VOUCHER_DETAIL, { id: voucher?.id })}>
        <Row>
          <Box width="30%">
            <Image source={{ uri: IMAGE_URL + voucher?.featured_img?.url }} style={styles.voucherImage} />
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
            <Text style={styles.cost}>{voucher?.cost || 0} {t('aed')}</Text>
          </Box>
        </Row>
      </RippleFX>
    </Card>
  )
}
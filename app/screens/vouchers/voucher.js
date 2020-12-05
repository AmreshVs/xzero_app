import React from 'react';
import { Image, Text, View } from 'react-native';

import Card from 'components/card';
import Box from 'components/box';
import Button from 'components/button';
import Row from 'components/row';
import Progress from 'components/progress';
import Divider from 'components/divider';
import { IMAGE_URL } from 'constants/common';
import { calculatePercentage } from 'constants/commonFunctions';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import RippleFX from 'components/rippleFx';
import { useNavigation } from '@react-navigation/native';
import { PAYMENT, VOUCHER_DETAIL } from 'navigation/routes';

export default function Voucher({ data, handleOpenModal }) {
  const { t } = useTranslation();
  const { push } = useNavigation();

  const handleVoucherDetailNavigation = () => {
    push(VOUCHER_DETAIL, { id: data?.id });
  }

  return (
    <Card style={styles.voucherContainer}>
      <View style={styles.voucherImageContainer}>
        <RippleFX onPress={() => handleVoucherDetailNavigation()}>
          <Image source={{ uri: IMAGE_URL + data?.featured_img?.url }} style={styles.voucherImg} />
          <View style={styles.costContainer}>
            <Text style={styles.cost}>{data?.cost || 0} {t('aed')}</Text>
          </View>
        </RippleFX>
      </View>
      <Row padding={10} paddingBottom={5}>
        <Box width="70%">
          <RippleFX onPress={() => handleVoucherDetailNavigation()}>
            <Text numberOfLines={1}>
              <Text style={styles.title}>{t('buy')} </Text>
              <Text style={styles.caption}>{data?.buy_title_en}</Text>
            </Text>
            <Text numberOfLines={1}>
              <Text style={styles.title}>{t('win')} </Text>
              <Text style={styles.caption} numberOfLines={1}>{data?.win_title_en}</Text>
            </Text>
          </RippleFX>
        </Box>
        <Box width="30%" marginTop={2}>
          <Button size="small" onPress={() => {
            handleOpenModal(data);
          }}>
            {t('buy_now')}
          </Button>
        </Box>
      </Row>
      <Divider />
      <Box padding={10} paddingTop={5}>
        <Progress percent={calculatePercentage(data?.total_bought, data?.limit)} countText={`${data?.total_bought} ${t('out of')} ${data?.limit}`} colorful />
      </Box>
    </Card>
  )
}
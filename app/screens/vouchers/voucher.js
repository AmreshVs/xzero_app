import React, { memo, useContext } from 'react';
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
import { calculatePercentage, smallUrl, thumbnailUrl } from 'constants/commonFunctions';
import { UserDataContext } from 'context';
import { VOUCHER_DETAIL } from 'navigation/routes';
import styles from './styles';

const Voucher = ({ data, handleOpenModal }) => {
  const { push } = useNavigation();
  const { userData } = useContext(UserDataContext);
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
          <ProgressiveImage
            thumbailSource={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img?.url) }}
            source={{ uri: IMAGE_URL + smallUrl(data?.featured_img?.url) }}
            style={styles.voucherImg}
          />
          <View style={styles.costContainer}>
            <Text style={styles.cost}>{(!userData || userData?.membership === null) ? data?.cost_for_non_members : data?.cost || 0} {t('aed')}</Text>
          </View>
        </RippleFX>
      </View>
      <Row padding={10} paddingBottom={5}>
        <Box width="70%">
          <RippleFX onPress={() => handleVoucherDetailNavigation()}>
            <Text numberOfLines={1}>
              <Text style={styles.title}>{t('buy')} </Text>
              <Text style={styles.caption}>{data?.[`buy_title_${language}`]}</Text>
              {(!userData || userData?.membership === null) && <Text style={styles.caption}> + {data?.membership_plans[0]?.[`name_${language}`]} {t('membership')}</Text>}
            </Text>
            <Text numberOfLines={1}>
              <Text style={styles.title}>{t('win')} </Text>
              <Text style={styles.caption} numberOfLines={1}>{data?.[`win_title_${language}`]}</Text>
            </Text>
          </RippleFX>
        </Box>
        <Box width="30%" marginTop={2}>
          <Button
            size="small"
            icon="money-bill"
            onPress={() => {
              handleOpenModal(data);
            }}
            disabled={['closed', 'publish'].includes(data?.draw_status)}
          >
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

export default memo(Voucher);
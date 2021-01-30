import React, { memo } from 'react';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';

import Button from 'components/button';
import ApplyPromocode from 'components/applyPromocode';
import DeliveryAddress from 'components/deliveryAddress';
import Card from 'components/card';
import Box from 'components/box';
import { ToastMsg } from 'components/toastMsg';
import { isTab, useReduxAction, userVerified } from 'constants/commonFunctions';
import { VOUCHER_QUEUE } from 'graphql/mutations';
import { PAYMENT, VOUCHER_DETAIL } from 'navigation/routes';
import useErrorLog from 'hooks/useErrorLog';
import { FadeInUpAnim, ScaleAnim } from 'animation';
import styles from './styles';

const BuyVoucherModal = ({ modalizeRef, promocodeData, setPromocodeData, voucher }) => {
  const { push } = useNavigation();
  const { t } = useTranslation();
  const userData = useReduxAction(state => state?.userReducer?.user);
  const client = useApolloClient();
  const { logError } = useErrorLog();

  const handlePayment = async () => {

    let mutationInput = {
      user: Number(userData?.id),
      voucher: Number(voucher?.id)
    };

    try {
      const { data } = await client.mutate({
        mutation: VOUCHER_QUEUE,
        variables: mutationInput
      });

      if (!data?.VoucherQueue?.disabled) {
        if (await userVerified()) {
          push(PAYMENT, {
            currency_code: 'AED',
            amount: promocodeData?.discountedPrice,
            multiplier: 100,
            voucher_id: voucher?.id,
            promocode: promocodeData?.codeApplied,
            discount: promocodeData?.discount
          });
        }
      }
      else {
        ToastMsg(t('queue_full'));
      }
    }
    catch (error) {
      ToastMsg(t('error_occured'));
      logError({
        screen: VOUCHER_DETAIL,
        module: 'Buy Voucher',
        input: JSON.stringify(mutationInput),
        error: JSON.stringify(error)
      });
    }
  }

  return (
    <Modalize
      ref={modalizeRef}
      childrenStyle={styles.modal}
      modalTopOffset={100}
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
      FooterComponent={
        <ScaleAnim style={styles.footer}>
          <Button
            icon="money_bill"
            width={isTab() ? "30%" : "100%"}
            onPress={() => handlePayment()}
            disabled={userData?.address === null}
          >
            {promocodeData?.discountedPrice === 0 ? t('free') : `${t('continue_to_pay')} ${promocodeData?.discountedPrice} ${t('aed')}`}
          </Button>
        </ScaleAnim>
      }
    >
      <Box flexDirection={isTab() ? "row" : "column"}>
        <FadeInUpAnim>
          <Card style={styles.addressContainer} margin={10}>
            <DeliveryAddress />
          </Card>
        </FadeInUpAnim>
        <FadeInUpAnim delay={100}>
          <Card style={styles.promocodeContainer} margin={10} marginTop={0}>
            <ApplyPromocode voucher_id={voucher?.id} voucherPrice={userData?.membership === null ? voucher?.cost_for_non_members : voucher?.cost} price={promocodeData?.discountedPrice} setPromocodeData={setPromocodeData} />
          </Card>
        </FadeInUpAnim>
      </Box>
    </Modalize>
  );
};

export default memo(BuyVoucherModal);
import React, { useContext, memo } from 'react';
import { View } from 'react-native';
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
import { isTab, userVerified } from 'constants/commonFunctions';
import { UserDataContext } from 'context';
import { VOUCHER_QUEUE } from 'graphql/mutations';
import { PAYMENT, VOUCHER_DETAIL } from 'navigation/routes';
import useErrorLog from 'hooks/useErrorLog';
import styles from './styles';

const BuyVoucherModal = ({ modalizeRef, promocodeData, setPromocodeData, voucher }) => {
  const { push } = useNavigation();
  const { t } = useTranslation();
  const { userData } = useContext(UserDataContext);
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
      modalTopOffset={200}
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
      FooterComponent={
        <View style={styles.footer}>
          <Button
            icon="money-bill"
            width={isTab() ? "30%" : "100%"}
            onPress={() => handlePayment()}
            disabled={userData?.address === null}
          >
            {promocodeData?.discountedPrice === 0 ? t('free') : `${t('continue_to_pay')} ${promocodeData?.discountedPrice} ${t('aed')}`}
          </Button>
        </View>
      }
    >
      <Box flexDirection={isTab() ? "row" : "column"}>
        <Card style={styles.addressContainer} margin={10}>
          <DeliveryAddress />
        </Card>
        <Card style={styles.promocodeContainer} margin={10} marginTop={0}>
          <ApplyPromocode voucher_id={voucher?.id} voucherPrice={userData?.membership === null ? voucher?.cost_for_non_members : voucher?.cost} price={promocodeData?.discountedPrice} setPromocodeData={setPromocodeData} />
        </Card>
      </Box>
    </Modalize>
  );
};

export default memo(BuyVoucherModal);
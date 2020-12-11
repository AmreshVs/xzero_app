import React from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Button from 'components/button';
import ApplyPromocode from 'components/applyPromocode';
import DeliveryAddress from 'components/deliveryAddress';
import Card from 'components/card';
import { PAYMENT } from 'navigation/routes';
import styles from './styles';
import Box from 'components/box';
import { isTab } from 'constants/commonFunctions';

const BuyVoucherModal = ({ modalizeRef, promocodeData, setPromocodeData, voucher }) => {
  const { push } = useNavigation();
  const { t } = useTranslation();

  return (
    <Modalize
      ref={modalizeRef}
      childrenStyle={styles.modal}
      modalTopOffset={300}
      scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
      FooterComponent={
        <View style={styles.footer}>
          <Button
            width={isTab() ? "30%" : "100%"}
            onPress={() => push(PAYMENT, {
              currency_code: 'AED',
              amount: promocodeData?.discountedPrice,
              multiplier: 100,
              voucher_id: voucher?.id,
              promocode: promocodeData?.codeApplied
            })}
          >
            {t('continue_to_pay')} {promocodeData?.discountedPrice} {t('aed')}
          </Button>
        </View>
      }
    >
      <Box flexDirection={isTab() ? "row" : "column"}>
        <Card style={styles.addressContainer} margin={10}>
          <DeliveryAddress />
        </Card>
        <Card style={styles.promocodeContainer} margin={10} marginTop={0}>
          <ApplyPromocode voucherPrice={voucher?.cost} price={promocodeData?.discountedPrice} setPromocodeData={setPromocodeData} />
        </Card>
      </Box>
    </Modalize>
  );
};

export default BuyVoucherModal;
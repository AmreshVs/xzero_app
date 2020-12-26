import React, { useState, useEffect, useContext } from 'react';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { useQuery, useApolloClient } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import SafeView from 'components/safeView';
import colors from 'constants/colors';
import TopNavigator from 'components/topNavigator';
import { firstLetterUpper } from 'constants/commonFunctions';
import RippleFX from 'components/rippleFx';
import { OFFERS_DETAIL } from 'graphql/queries';
import addFavourite from 'screens/offers/addFavourite';
import OfferCard from './offerCard';
import CenterInfo from './centerInfo';
import PriceDetails from './priceDetails';
import OfferDescription from './offerDescription';
import AvailDiscount from './availDiscount';
import ContactCenter from './contactCenter';
import styles from './styles';
import { UserDataContext } from 'context';
import Row from 'components/row';
import ShareOffer from './shareOffer';
import useErrorLog from 'hooks/useErrorLog';
import { ToastMsg } from 'components/toastMsg';
import { OFFER_DETAIL } from 'navigation/routes';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

const OfferDetail = () => {
  const { userData } = useContext(UserDataContext);
  const { params: { offer_id, user_id, center } } = useRoute();
  const { logError } = useErrorLog();
  const { t } = useTranslation();

  const { data, loading, error } = useQuery(OFFERS_DETAIL, {
    variables: {
      offer_id: Number(offer_id),
      id: Number(offer_id) || 0,
      user_id: Number(user_id) || Number(userData?.id) || 0
    },
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: OFFER_DETAIL,
      module: 'Get Offer detail',
      input: JSON.stringify({
        offer_id: Number(offer_id),
        id: Number(offer_id) || 0,
        user_id: Number(user_id) || Number(userData?.id) || 0
      }),
      error: JSON.stringify(error)
    });
  }

  const [favourite, setFavourite] = useState(data?.offerIsFavourite || false);
  const client = useApolloClient();

  const handleFavourite = async (offer_id) => {
    setFavourite(!favourite);
    await addFavourite(client, Number(offer_id), Number(data?.offer?.center?.id));
  };

  useEffect(() => {
    setFavourite(data?.offerIsFavourite);
  }, [data]);

  let offer = data?.offer;

  const RightIcon = () => {
    return (
      <RippleFX style={styles.rightIcon} onPress={() => handleFavourite(data?.offer?.id)}>
        <FontAwesomeIcon icon="heart" color={favourite ? colors.danger : colors.white} size={15} />
      </RippleFX>
    );
  };

  return (
    <>
      <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={styles.gradient} />
      <SafeView style={styles.container} topNav loading={loading}>
        <TopNavigator
          title={firstLetterUpper(center)}
          color={colors.white}
          rightContainer={userData && <RightIcon />}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <OfferCard discount={offer?.discount} />
          <CenterInfo offer={offer} username={userData?.id} />
          <PriceDetails offer={offer} center={center} />
          <OfferDescription offer={offer} />
          <AvailDiscount loading={loading} data={data} />
          <Row justifyContent="space-between">
            <ContactCenter username={userData?.username} mobile_number={offer?.mobile_number} />
            <ShareOffer data={offer} />
          </Row>
        </ScrollView>
      </SafeView>
    </>
  );
}

export default memo(OfferDetail);
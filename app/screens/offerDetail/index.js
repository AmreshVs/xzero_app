import React, { useState, useEffect, useContext, memo } from 'react';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { useQuery, useApolloClient } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTranslation } from 'react-i18next';

import addFavourite from 'screens/offers/addFavourite';
import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import RippleFX from 'components/rippleFx';
import { ToastMsg } from 'components/toastMsg';
import Row from 'components/row';
import colors from 'constants/colors';
import { firstLetterUpper } from 'constants/commonFunctions';
import { UserDataContext } from 'context';
import { OFFERS_DETAIL } from 'graphql/queries';
import useErrorLog from 'hooks/useErrorLog';
import { OFFER_DETAIL } from 'navigation/routes';
import ShareOffer from './shareOffer';
import OfferCard from './offerCard';
import CenterInfo from './centerInfo';
import PriceDetails from './priceDetails';
import OfferDescription from './offerDescription';
import AvailDiscount from './availDiscount';
import ContactCenter from './contactCenter';
import styles from './styles';

const OfferDetail = () => {
  const { userData } = useContext(UserDataContext);
  const { params: { offer_id, user_id, center } } = useRoute();
  const { logError } = useErrorLog();
  const { t } = useTranslation();

  let queryInput = {
    offer_id: Number(offer_id),
    id: Number(offer_id) || 0,
    user_id: Number(user_id) || Number(userData?.id) || 0
  };

  const { data, loading, error } = useQuery(OFFERS_DETAIL, {
    variables: queryInput,
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: OFFER_DETAIL,
      module: 'Get Offer detail',
      input: JSON.stringify(queryInput),
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
          <AvailDiscount data={data?.offerGuideline} />
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
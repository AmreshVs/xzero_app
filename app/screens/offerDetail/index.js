import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Platform, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useQuery, useApolloClient } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import SafeView from 'components/safeView';
import colors from 'constants/colors';
import TopNavigator from 'components/topNavigator';
import { SCREEN_HEIGHT, SCREEN_WIDTH, BASE_URL } from 'constants/common';
import { getShadowStyle, dialNumber, openMaps, firstLetterUpper } from 'constants/commonFunctions';
import Row from 'components/row';
import Button from 'components/button';
import Card from 'components/card';
import RippleFX from 'components/rippleFx';
import { OFFERS_DETAIL } from 'graphql/queries';
import addFavourite from 'screens/offers/addFavourite';
import useUserData from 'hooks/useUserData';
import DisabledContainer from 'components/disabledContainer';
import Box from 'components/box';

export default function OfferDetail() {
  const {
    params: { id, offer_id, user_id, center },
  } = useRoute();
  const { data, loading } = useQuery(OFFERS_DETAIL, {
    variables: { offer_id, id, user_id },
  });

  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [favourite, setFavourite] = useState(data?.offerIsFavourite || false);
  const client = useApolloClient();
  const userData = useUserData();

  const handleFavourite = async (offer_id) => {
    setFavourite(!favourite);
    await addFavourite(client, Number(offer_id));
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
        <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true}>
          <Card style={styles.discountContainer}>
            <Image
              source={{
                uri: BASE_URL + '/uploads/3522051_dc4fe0d199.jpg',
              }}
              style={styles.offerBg}
            />
            <LinearGradient
              colors={[colors.gradient1, colors.gradient2]}
              style={styles.discountCircle}
            >
              <Text style={styles.discount}>{offer?.discount}%</Text>
              <Text style={styles.discountText}>{t('discount')}</Text>
            </LinearGradient>
            <Text style={styles.caption}>{t('limited_offer')}</Text>
          </Card>
          <Row marginTop={10} justifyContent="space-between">
            <Card style={styles.infoContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {offer?.center?.[`title_${language}`]}
              </Text>
              <Row marginTop={5}>
                <FontAwesomeIcon icon="map-marker-alt" color={colors.text_lite} />
                <Text style={styles.location}>
                  {offer?.place}, {offer?.city}
                </Text>
              </Row>
            </Card>
            <DisabledContainer status={userData?.username} borderRadius={10}>
              <RippleFX
                onPress={() =>
                  openMaps(
                    Number(offer?.latitude),
                    Number(offer?.longitude),
                    offer?.center?.[`title_${language}`]
                  )
                }
              >
                <Card style={styles.mapContainer}>
                  <FontAwesomeIcon icon="map-marked-alt" color={colors.primary} size={35} />
                  <Text style={styles.mapText}>{t('open_map')}</Text>
                </Card>
              </RippleFX>
            </DisabledContainer>
          </Row>
          <Row marginTop={10}>
            <Card style={styles.descContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {t('offer')}
              </Text>
              <Row justifyContent="space-between">
                <Box flex={1}>
                  <Text style={styles.descText}>{center}</Text>
                </Box>
                <Row paddingLeft={5}>
                  {offer?.discounted_price && (
                    <>
                      <Text style={styles.discountPrice}>AED {offer?.discounted_price}</Text>
                      <Text style={styles.originalPrice}>{offer?.actual_price}</Text>
                    </>
                  )}
                </Row>
              </Row>
            </Card>
          </Row>
          <Row marginTop={10}>
            <Card style={styles.descContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {t('description')}
              </Text>
              <Text style={styles.descText}>{offer?.[`desc_${language}`]}</Text>
            </Card>
          </Row>
          <Row marginTop={10}>
            <Card style={styles.descContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {t('avail_discount')}
              </Text>
              {loading === false &&
                data?.membershipBenefit?.[`text_${language}`].split('\n').map((benefit, index) => {
                  if (benefit !== '') {
                    return (
                      <Text style={styles.descText} key={index}>
                        {index + 1 + '. ' + benefit}
                      </Text>
                    );
                  }
                  return null;
                })}
            </Card>
          </Row>
          <Row marginTop={10}>
            <Card style={styles.descContainer} marginBottom={10}>
              <Text style={styles.title} numberOfLines={1}>
                {t('contact')}
              </Text>
              <Box marginTop={10}>
                <Button
                  status="success"
                  icon="phone-alt"
                  disabled={!userData?.username}
                  onPress={() => dialNumber(offer?.mobile_number)}
                >
                  {t('call')}
                </Button>
              </Box>
            </Card>
          </Row>
        </ScrollView>
      </SafeView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  discountContainer: {
    marginTop: 10,
    width: '100%',
    height: SCREEN_HEIGHT / 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  discountCircle: {
    height: SCREEN_HEIGHT / 5,
    width: SCREEN_HEIGHT / 5,
    borderRadius: Platform.OS === 'ios' ? 80 : 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discount: {
    fontSize: SCREEN_HEIGHT / 15,
    fontWeight: '700',
    color: colors.white,
  },
  discountText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: '700',
  },
  caption: {
    position: 'absolute',
    bottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    ...getShadowStyle(),
  },
  infoContainer: {
    width: SCREEN_WIDTH / 1.5,
    height: SCREEN_HEIGHT / 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text_dark,
  },
  location: {
    color: colors.text_lite,
    marginLeft: 5,
  },
  mapContainer: {
    width: SCREEN_WIDTH / 4,
    height: SCREEN_HEIGHT / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    marginTop: 5,
    color: colors.text_dark,
  },
  descContainer: {
    width: '100%',
    height: 'auto',
  },
  descText: {
    color: colors.text_lite,
    marginTop: 5,
  },
  rightIcon: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 70,
    overflow: 'hidden',
    flex: 1,
  },
  offerBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.5,
  },
  discountPrice: {
    fontSize: 20,
    color: colors.gradient2,
    fontWeight: '700',
    marginRight: 5,
  },
  originalPrice: {
    color: colors.danger,
    textDecorationLine: 'line-through',
    fontSize: 20,
  },
});

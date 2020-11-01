import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import colors from 'constants/colors';
import TopNavigator from 'components/topNavigator';
import { SCREEN_HEIGHT, IMAGE_URL } from 'constants/common';
import Row from 'components/row';
import Button from 'components/button';
import Card from 'components/card';
import RippleFX from 'components/rippleFx';
import { SPECIALIST } from 'graphql/queries';
import { sendWhatsappMessage, handleMobileNumber } from 'constants/commonFunctions';
import { OFFERS_SCREEN } from 'navigation/routes';
import useUserData from 'hooks/useUserData';
import ProgressiveImage from 'components/progressiveImage';

export default function SpecialistDetail() {
  const {
    params: { id },
  } = useRoute();
  const { data, loading } = useQuery(SPECIALIST, {
    variables: { id: Number(id) },
  });

  const { push } = useNavigation();
  const { t, i18n } = useTranslation();
  const userData = useUserData();

  const language = i18n.language;
  let specialist = data?.specialist;

  const handleViewCenter = async () => {
    push(OFFERS_SCREEN, {
      center: Number(specialist?.center?.id),
      user_id: Number(userData?.id) || 0,
    });
  };

  const getWhatsappMessage = () => {
    return `${t('whatsapp1')} ${userData?.username} ${t('whatsapp2')}`;
  };

  return (
    <>
      <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={styles.gradient} />
      <SafeView style={styles.container} topNav loading={loading}>
        <TopNavigator title={t('specialist_detail')} color={colors.white} />
        <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true}>
          <Card style={styles.specialistImageContainer}>
            <ProgressiveImage
              source={{ uri: IMAGE_URL + specialist?.featured_img?.url }}
              style={styles.specialistImagebg}
              noBg
            />
            <ProgressiveImage
              source={{ uri: IMAGE_URL + specialist?.featured_img?.url }}
              style={styles.specialistImage}
              noBg
            />
            <Text style={styles.title}>{specialist?.[`name_${language}`]}</Text>
            <Text style={styles.specializationCaption}>
              {specialist?.[`specialization_${language}`]}
            </Text>
          </Card>
          <Row marginTop={10}>
            <Card style={styles.infoContainer}>
              <Text style={styles.about} numberOfLines={1}>
                {t(`about_specialist`)}
              </Text>
              <Text style={[styles.caption, styles.noTopMargin]}>
                {specialist?.[`desc_${language}`]}
              </Text>
            </Card>
          </Row>
          {specialist?.center && (
            <Row marginTop={10}>
              <Card style={styles.infoContainer}>
                <Text style={styles.about} numberOfLines={1}>
                  {t(`about_center`)}
                </Text>
                <Row>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{
                        uri: IMAGE_URL + specialist?.center?.featured_img.url,
                      }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.name} numberOfLines={1}>
                      {specialist?.center?.[`title_${language}`]}
                    </Text>
                    <Row vcenter>
                      <FontAwesomeIcon
                        icon="map-marker-alt"
                        color={colors.text_lite}
                        size={17}
                        style={styles.icon}
                      />
                      <Text style={[styles.caption, styles.place]} numberOfLines={1}>
                        {specialist?.center?.place}, {specialist?.center?.city}
                      </Text>
                    </Row>
                    <RippleFX style={styles.viewOffersContainer} onPress={() => handleViewCenter()}>
                      <Text style={styles.viewOffers}>{t('view_offers')}</Text>
                    </RippleFX>
                  </View>
                </Row>
              </Card>
            </Row>
          )}
          <Row marginVertical={10}>
            <Card style={styles.infoContainer}>
              <Text style={styles.about} numberOfLines={1}>
                {t(`contact`)}
              </Text>
              <Button
                style={styles.callButton}
                status="success"
                icon={faWhatsapp}
                disabled={!userData?.username || specialist?.mobile_number === null}
                onPress={() =>
                  sendWhatsappMessage(
                    getWhatsappMessage(),
                    handleMobileNumber(specialist?.mobile_number)
                  )
                }
              >
                {t('connect_whatsapp')}
              </Button>
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
  specialistImageContainer: {
    marginTop: 10,
    width: '100%',
    height: SCREEN_HEIGHT / 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  specialistImage: {
    height: 150,
    width: 150,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  specialistImagebg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    opacity: 0.09,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  caption: {
    marginTop: 5,
    color: colors.text_lite,
  },
  specializationCaption: {
    marginTop: 5,
    color: colors.chip_1,
    fontWeight: '700',
  },
  infoContainer: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text_dark,
    textAlign: 'center',
  },
  location: {
    color: colors.text_lite,
    marginLeft: 5,
  },
  descText: {
    color: colors.text_lite,
    marginTop: 5,
  },
  callButton: {
    marginTop: 5,
  },
  about: {
    color: colors.text_dark,
    textAlign: 'left',
    fontWeight: '700',
    marginBottom: 5,
  },
  imageContainer: {
    width: '30%',
  },
  image: {
    height: 100,
    width: '100%',
    borderRadius: 10,
  },
  detailContainer: {
    paddingLeft: 10,
    width: '70%',
    overflow: 'hidden',
  },
  icon: {
    marginTop: 5,
    marginRight: 5,
  },
  viewOffersContainer: {
    backgroundColor: colors.chip_1,
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  viewOffers: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '700',
  },
  noTopMargin: {
    marginTop: 0,
  },
  name: {
    fontWeight: '700',
  },
  place: {
    width: '90%',
  },
});

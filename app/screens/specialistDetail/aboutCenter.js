import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from 'constants/colors';
import { IMAGE_URL } from 'constants/common';
import Row from 'components/row';
import Card from 'components/card';
import RippleFX from 'components/rippleFx';
import { OFFERS_SCREEN } from 'navigation/routes';
import styles from './styles';
import { thumbnailUrl } from 'constants/commonFunctions';
import { memo } from 'react';
import ProgressiveImage from 'components/progressiveImage';

const AboutCenter = ({ specialist, userData }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { push } = useNavigation();

  const handleViewCenter = async () => {
    push(OFFERS_SCREEN, {
      center: Number(specialist?.center?.id),
      user_id: Number(userData?.id) || 0,
    });
  };

  return (
    <Card marginTop={10} style={styles.infoContainer}>
      <Row>
        <Text style={styles.about} numberOfLines={1}>
          {t(`about_center`)}
        </Text>
        <Row>
          <View style={styles.imageContainer}>
            <ProgressiveImage
              style={styles.image}
              thumbnailSource={{ uri: IMAGE_URL + thumbnailUrl(specialist?.center?.featured_img.url) }}
              source={{ uri: IMAGE_URL + thumbnailUrl(specialist?.center?.featured_img.url) }}
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
                style={styles.icon} />
              <Text style={[styles.caption, styles.place]} numberOfLines={1}>
                {specialist?.center?.place}, {specialist?.center?.city}
              </Text>
            </Row>
            <RippleFX style={styles.viewOffersContainer} onPress={() => handleViewCenter()}>
              <Text style={styles.viewOffers}>{t('view_offers')}</Text>
            </RippleFX>
          </View>
        </Row>
      </Row>
    </Card>
  );
};

export default memo(AboutCenter);
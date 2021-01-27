import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Row from 'components/row';
import Card from 'components/card';
import RippleFX from 'components/rippleFx';
import ProgressiveImage from 'components/progressiveImage';
import colors from 'constants/colors';
import { IMAGE_URL } from 'constants/common';
import { thumbnailUrl } from 'constants/commonFunctions';
import { OFFERS_SCREEN } from 'navigation/routes';
import Icon from 'icon';
import styles from './styles';

const AboutCenter = ({ specialist, userData }) => {
  const { t, i18n } = useTranslation();
  const { push } = useNavigation();
  let language = i18n.language;

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
              <Icon
                name="map_marker_alt"
                color={colors.text_lite}
                size={15}
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
      </Row>
    </Card>
  );
};

export default memo(AboutCenter);
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import Row from 'components/row';
import RippleFX from 'components/rippleFx';
import ProgressiveImage from 'components/progressiveImage';
import { IMAGE_URL } from 'constants/common';
import colors from 'constants/colors';
import { thumbnailUrl } from 'constants/commonFunctions';
import { SPECIALIST_DETAIL } from 'navigation/routes';
import Icon from 'icon';
import { FadeAnim, ScaleAnim } from 'animation';
import styles from './styles';

const Specialist = ({ data }) => {
  const { push } = useNavigation();
  const { i18n } = useTranslation();
  const language = i18n.language;

  const handlePress = (sid) => {
    push(SPECIALIST_DETAIL, {
      id: sid,
    });
  };

  return (
    <Card style={styles.container}>
      <RippleFX onPress={() => handlePress(data?.id)}>
        <Row>
          <ScaleAnim style={styles.imageContainer}>
            <ProgressiveImage
              source={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img?.url) }}
              style={styles.image}
            />
          </ScaleAnim>
          <FadeAnim style={styles.infoContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {data?.[`name_${language}`]}
            </Text>
            <Text style={styles.specialization} numberOfLines={1}>
              {data?.[`specialization_${language}`]}
            </Text>
            <Text style={styles.caption} numberOfLines={2}>
              {data?.[`desc_${language}`]}
            </Text>
            <Row flexWrap="nowrap">
              <Icon
                name="map_marker_alt"
                color={colors.text_lite}
                size={15}
              />
              <Text style={styles.locationCaption} numberOfLines={1}>
                {data?.center?.place}, {data?.center?.city}
              </Text>
            </Row>
          </FadeAnim>
        </Row>
      </RippleFX>
    </Card>
  );
}

export default memo(Specialist);
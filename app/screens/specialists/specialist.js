import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';

import Card from 'components/card';
import { IMAGE_URL } from 'constants/common';
import Row from 'components/row';
import colors from 'constants/colors';
import { useTranslation } from 'react-i18next';
import RippleFX from 'components/rippleFx';
import { SPECIALIST_DETAIL } from 'navigation/routes';
import ProgressiveImage from 'components/progressiveImage';
import styles from './styles';
import { thumbnailUrl } from 'constants/commonFunctions';

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
          <View style={styles.imageContainer}>
            <ProgressiveImage
              source={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img?.url) }}
              style={styles.image}
            />
          </View>
          <View style={styles.infoContainer}>
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
              <FontAwesomeIcon
                icon="map-marker-alt"
                color={colors.text_lite}
                size={17}
                style={styles.icon}
              />
              <Text style={styles.locationCaption} numberOfLines={1}>
                {data?.center?.place}, {data?.center?.city}
              </Text>
            </Row>
          </View>
        </Row>
      </RippleFX>
    </Card>
  );
}

export default memo(Specialist);
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';

import Card from 'components/card';
import { IMAGE_URL, SCREEN_WIDTH, SCREEN_HEIGHT } from 'constants/common';
import Row from 'components/row';
import colors from 'constants/colors';
import { useTranslation } from 'react-i18next';
import RippleFX from 'components/rippleFx';
import { SPECIALIST_DETAIL } from 'navigation/routes';
import ProgressiveImage from 'components/progressiveImage';

export default function Specialist({ data }) {
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
              source={{ uri: IMAGE_URL + data?.featured_img?.url }}
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
            <Row>
              <FontAwesomeIcon
                icon="map-marker-alt"
                color={colors.text_lite}
                size={17}
                style={styles.icon}
              />
              <Text style={styles.caption} numberOfLines={1}>
                {data?.center?.place}, {data?.center?.city}
              </Text>
            </Row>
          </View>
        </Row>
      </RippleFX>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  imageContainer: {
    width: '30%',
  },
  image: {
    borderRadius: 60,
    borderRadius: Math.round(SCREEN_WIDTH + SCREEN_HEIGHT) / 2,
    width: SCREEN_WIDTH * 0.27,
    height: SCREEN_WIDTH * 0.27,
  },
  infoContainer: {
    width: '70%',
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text_dark,
    marginBottom: 2,
  },
  caption: {
    color: colors.text_lite,
    marginBottom: 5,
  },
  specialization: {
    color: colors.violet,
    fontWeight: '700',
    marginBottom: 5,
  },
  icon: {
    marginRight: 3,
  },
});

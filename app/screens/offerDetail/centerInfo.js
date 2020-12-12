import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from 'constants/colors';
import { openMaps } from 'constants/commonFunctions';
import Row from 'components/row';
import Card from 'components/card';
import RippleFX from 'components/rippleFx';
import DisabledContainer from 'components/disabledContainer';
import styles from './styles';

const CenterInfo = ({ offer, username }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Row flexWrap="wrap" marginTop={10} justifyContent="space-between">
      <Card style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {offer?.center?.[`title_${language}`]}
        </Text>
        <Row marginTop={5} flexWrap="nowrap">
          <FontAwesomeIcon icon="map-marker-alt" color={colors.text_lite} />
          <Text style={styles.location}>
            {offer?.place}, {offer?.city}
          </Text>
        </Row>
      </Card>
      <Card style={styles.mapContainer}>
        <RippleFX
          onPress={() => openMaps(
            Number(offer?.latitude),
            Number(offer?.longitude),
            offer?.center?.[`title_${language}`]
          )}
        >
          <DisabledContainer status={username} borderRadius={10}>
            <FontAwesomeIcon icon="map-marked-alt" color={colors.primary} size={35} />
            <Text style={styles.mapText}>{t('open_map')}</Text>
          </DisabledContainer>
        </RippleFX>
      </Card>
    </Row>
  );
};

export default CenterInfo;
import React, { memo } from 'react';
import { Linking, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from 'constants/colors';
import Row from 'components/row';
import Card from 'components/card';
import RippleFX from 'components/rippleFx';
import DisabledContainer from 'components/disabledContainer';
import Box from 'components/box';
import styles from './styles';

const CenterInfo = ({ offer, username }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Card style={styles.infoContainer}>
      <Row>
        <Box style={styles.centerInfo} width="85%">
          <Text style={styles.title} numberOfLines={1}>
            {offer?.center?.[`title_${language}`]}
          </Text>
          <Row marginTop={5} flexWrap="nowrap">
            <FontAwesomeIcon icon="map-marker-alt" color={colors.text_lite} />
            <Text style={styles.location}>
              {offer?.place}, {offer?.city}
            </Text>
          </Row>
        </Box>
        <Box width="15%">
          <DisabledContainer status={username || offer?.google_map_location === ''} borderRadius={10}>
            <RippleFX
              style={styles.mapContentContainer}
              onPress={() => Linking.openURL(offer?.google_map_location)}
            >
              <FontAwesomeIcon icon="map-marked-alt" color={colors.primary} size={28} />
              <Text style={styles.mapText}>{t('open_map')}</Text>
            </RippleFX>
          </DisabledContainer>
        </Box>
      </Row>
    </Card>
  );
};

export default memo(CenterInfo);
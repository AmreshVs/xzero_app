import React, { memo } from 'react';
import { Linking, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import Row from 'components/row';
import Card from 'components/card';
import RippleFX from 'components/rippleFx';
import DisabledContainer from 'components/disabledContainer';
import Box from 'components/box';
import Icon from 'icon';
import { FadeInUpAnim, ScaleAnim } from 'animation';
import styles from './styles';

const CenterInfo = ({ offer, username }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <FadeInUpAnim delay={100}>
      <Card style={styles.infoContainer} shadow={false}>
        <Row>
          <Box style={styles.centerInfo} width="85%">
            <Text style={styles.title} numberOfLines={1}>
              {offer?.center?.[`title_${language}`]}
            </Text>
            <Row marginTop={5} flexWrap="nowrap">
              <Icon name="map_marker_alt" color={colors.text_lite} size={17} />
              <Text style={styles.location}>
                {offer?.place}, {offer?.city}
              </Text>
            </Row>
          </Box>
          <Box width="15%">
            <ScaleAnim>
              <DisabledContainer status={username || offer?.google_map_location === ''} borderRadius={10}>
                <RippleFX
                  style={styles.mapContentContainer}
                  onPress={() => Linking.openURL(offer?.google_map_location)}
                >
                  <Icon name="map_marked_alt" color={colors.primary} size={28} wviewBox={600} />
                  <Text style={styles.mapText}>{t('open_map')}</Text>
                </RippleFX>
              </DisabledContainer>
            </ScaleAnim>
          </Box>
        </Row>
      </Card>
    </FadeInUpAnim>
  );
};

export default memo(CenterInfo);
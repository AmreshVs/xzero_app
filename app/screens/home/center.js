import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Column from 'components/column';
import colors from 'constants/colors';
import Box from 'components/box';
import Row from 'components/row';
import Chip from 'components/chip';
import RippleFX from 'components/rippleFx';
import VHCenter from 'components/vhCenter';
import ProgressiveImage from 'components/progressiveImage';
import { isTab, thumbnailUrl, useReduxAction } from 'constants/commonFunctions';
import { IMAGE_URL } from 'constants/common';
import { OFFERS_SCREEN } from 'navigation/routes';
import styles from './styles';

const Center = ({ data }) => {
  const { push } = useNavigation();
  const { t, i18n } = useTranslation();
  const userData = useReduxAction(state => state?.userReducer?.user);
  const language = i18n.language;

  const handlePress = async (id) => {
    push(OFFERS_SCREEN, {
      center: id,
      user_id: Number(userData?.id) || 0
    }
    );
  };

  return (
    <Box width={isTab() ? '49.4%' : '100%'}>
      <RippleFX
        style={styles.centerContainer}
        onPress={() => handlePress(data?.id)}
      >
        <Row>
          <VHCenter paddingLeft={10}>
            <ProgressiveImage
              source={{ uri: IMAGE_URL + thumbnailUrl(data.featured_img) }}
              style={styles.centerImage}
              resizeMode="contain"
            />
          </VHCenter>
          <Box padding={10} style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {data?.[`title_${language}`]}
            </Text>
            <Text style={styles.caption} numberOfLines={1}>
              {data.place}, {(data.city).replace('_', ' ')}
            </Text>
            <View style={styles.chipContainer}>
              <Column>
                <Chip
                  title={`${data.offersCount}+ ${t('offers')}`}
                  color={colors.chip_1}
                  marginBottom={5}
                />
                {data?.discount === 100 ? (
                  <Chip title={t('free')} color={colors.danger} />
                ) : (
                    <Chip title={`${data?.discount}% ${t('discount')}`} color={colors.chip_2} />
                  )}
              </Column>
            </View>
          </Box>
        </Row>
      </RippleFX>
    </Box>
  );
}

export default memo(Center);

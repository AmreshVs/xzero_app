import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Box from 'components/box';
import Row from 'components/row';
import Divider from 'components/divider';
import colors from 'constants/colors';
import Chip from 'components/chip';
import RippleFX from 'components/rippleFx';
import ProgressiveImage from 'components/progressiveImage';
import { useContext } from 'react';
import { thumbnailUrl } from 'constants/commonFunctions';
import { IMAGE_URL } from 'constants/common';
import { UserDataContext } from 'context';
import { OFFERS_SCREEN } from 'navigation/routes';
import styles from './styles';

const Center = ({ data }) => {
  const { push } = useNavigation();
  const { t, i18n } = useTranslation();
  const { userData } = useContext(UserDataContext);
  const language = i18n.language;

  const handlePress = async () => {
    push(OFFERS_SCREEN, { center: data?.id, user_id: Number(userData?.id) || 0 });
  };

  return (
    <RippleFX style={styles.container} onPress={() => handlePress()}>
      <View>
        <Row hcenter>
          <Box padding={10} paddingBottom={5}>
            <Chip
              title={
                language === 'en'
                  ? `${data?.offersCount} ${t('offers')}`
                  : `${t('offers')} ${data?.offersCount}`
              }
              color={colors.success}
              paddingHorizontal={10}
            />
          </Box>
        </Row>
        <Divider />
      </View>
      <Box padding={5}>
        <Row style={styles.imgContainer} vcenter hcenter>
          <ProgressiveImage
            style={styles.image}
            source={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img) }}
            source={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img) }}
            resizeMode="contain"
          />
        </Row>
      </Box>
      <View>
        <Divider />
        <Row hcenter>
          <Box padding={10} paddingTop={0}>
            <Text style={styles.title} numberOfLines={1}>
              {data?.[`title_${language}`]}
            </Text>
            <Row marginTop={5} vcenter hcenter>
              {data?.discount === 100 ? (
                <Chip title={t('free')} color={colors.danger} />
              ) : (
                  <Chip title={`${data?.discount}% ${t('discount')}`} color={colors.chip_2} />
                )}
            </Row>
          </Box>
        </Row>
      </View>
    </RippleFX>
  );
}

export default memo(Center);
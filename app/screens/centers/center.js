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
import { thumbnailUrl, useReduxAction } from 'constants/commonFunctions';
import { ANIM_COMPONENT_DELAY, IMAGE_URL } from 'constants/common';
import { OFFERS_SCREEN } from 'navigation/routes';
import { FadeAnim, FadeInUpAnim, ScaleAnim } from 'animation';
import styles from './styles';

const Center = ({ data, index = 0 }) => {
  const { push } = useNavigation();
  const { t, i18n } = useTranslation();
  const userData = useReduxAction(state => state?.userReducer?.user);
  const language = i18n.language;

  const handlePress = async () => {
    push(OFFERS_SCREEN, { center: data?.id, user_id: Number(userData?.id) || 0 });
  };

  return (
    <FadeInUpAnim style={styles.container} delay={index * ANIM_COMPONENT_DELAY}>
      <RippleFX onPress={() => handlePress()}>
        <View>
          <Row hcenter>
            <ScaleAnim>
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
            </ScaleAnim>
          </Row>
          <Divider />
        </View>
        <Box padding={5}>
          <Row style={styles.imgContainer} vcenter hcenter>
            <FadeAnim>
              <ProgressiveImage
                style={styles.image}
                source={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img) }}
                source={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img) }}
                resizeMode="contain"
              />
            </FadeAnim>
          </Row>
        </Box>
        <View>
          <Divider />
          <Row hcenter>
            <Box padding={10} paddingTop={0}>
              <FadeAnim>
                <Text style={styles.title} numberOfLines={1}>
                  {data?.[`title_${language}`]}
                </Text>
              </FadeAnim>
              <ScaleAnim>
                <Row marginTop={5} vcenter hcenter>
                  {data?.discount === 100 ? (
                    <Chip title={t('free')} color={colors.danger} />
                  ) : (
                      <Chip title={`${data?.discount}% ${t('discount')}`} color={colors.chip_2} />
                    )}
                </Row>
              </ScaleAnim>
            </Box>
          </Row>
        </View>
      </RippleFX>
    </FadeInUpAnim>
  );
}

export default memo(Center);
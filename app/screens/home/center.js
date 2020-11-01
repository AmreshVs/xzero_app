import React, { memo } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Column from 'components/column';
import colors from 'constants/colors';
import { getShadowStyle, getUserData } from 'constants/commonFunctions';
import Box from 'components/box';
import Row from 'components/row';
import Chip from 'components/chip';
import RippleFX from 'components/rippleFx';
import { IMAGE_URL } from 'constants/common';
import { OFFERS_SCREEN } from 'navigation/routes';

function Center({ data }) {
  const { push } = useNavigation();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const handlePress = async (id) => {
    const userData = await getUserData();
    push(OFFERS_SCREEN, { center: id, user_id: Number(userData?.id) || 0 });
  };

  return (
    <RippleFX style={styles.container} onPress={() => handlePress(data?.id)}>
      <Row>
        <Image source={{ uri: IMAGE_URL + data.featured_img }} style={styles.image} />
        <Box padding={10} style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {data?.[`title_${language}`]}
          </Text>
          <Text style={styles.caption} numberOfLines={1}>
            {data.place}, {data.city}
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
  );
}

export default memo(Center);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 10,
    ...getShadowStyle(),
  },
  image: {
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 2,
  },
  textContainer: {
    flex: 3,
  },
  title: {
    fontWeight: '700',
    color: colors.text_dark,
    width: '100%',
    marginBottom: 5,
    textAlign: 'left',
  },
  caption: {
    color: colors.text_lite,
  },
  chipContainer: {
    marginTop: 5,
    width: '100%',
  },
});

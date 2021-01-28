import React, { useState, memo } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import Row from 'components/row';
import Chip from 'components/chip';
import RippleFX from 'components/rippleFx';
import { IMAGE_URL } from 'constants/common';
import Column from 'components/column';
import ProgressiveImage from 'components/progressiveImage';
import { ToastMsg } from 'components/toastMsg';
import colors from 'constants/colors';
import { isTab, thumbnailUrl, useReduxAction } from 'constants/commonFunctions';
import { OFFERS_SCREEN, OFFER_DETAIL } from 'navigation/routes';
import useErrorLog from 'hooks/useErrorLog';
import Icon from 'icon';
import addFavourite from './addFavourite';
import styles from './styles';
import { FadeInUpAnim, ScaleAnim } from 'animation';

function Offer({ data, center, favourites }) {

  const client = useApolloClient();
  const { push } = useNavigation();
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { logError } = useErrorLog();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const [favourite, setFavourite] = useState(data?.is_favourite);

  const handlePress = async () => {
    push(OFFER_DETAIL, {
      offer_id: Number(data.id),
      id: Number(data.id),
      user_id: Number(userData?.id) || 0,
      center: data?.[`title_${language}`],
    });
  };

  const handleFavourite = async (id) => {
    setFavourite(!favourite);
    try {
      await addFavourite(client, id, center);
    }
    catch (error) {
      // console.log('Add Favourite error', error);
      ToastMsg(t('error_occured'));
      logError({
        screen: OFFERS_SCREEN,
        module: 'Add Favorite',
        input: JSON.stringify({
          user_id: userData?.id,
          offer_id: id
        }),
        error: JSON.stringify(error)
      });
    }
    if (favourites) {
      favourites();
    }
  };

  return (
    <Row style={styles.offerContainer}>
      <Box flex={2} style={styles.imgContainer}>
        <RippleFX onPress={() => handlePress()}>
          <ScaleAnim>
            <ProgressiveImage
              style={styles.image}
              thumbnailSource={{ uri: IMAGE_URL + (isTab() ? data?.featured_img?.url : thumbnailUrl(data?.featured_img?.url)) }}
              source={{ uri: IMAGE_URL + (isTab() ? data?.featured_img?.url : thumbnailUrl(data?.featured_img?.url)) }}
              resizeMode="contain"
            />
          </ScaleAnim>
        </RippleFX>
      </Box>
      <Column flex={6} style={styles.nameContainer}>
        <RippleFX onPress={() => handlePress()}>
          <FadeInUpAnim delay={5}>
            <Text style={styles.title} numberOfLines={2}>
              {data?.[`title_${language}`]}
            </Text>
            <Text style={styles.caption} numberOfLines={2}>
              {data?.[`desc_${language}`]}
            </Text>
          </FadeInUpAnim>
          {data?.discount === 100 ? (
            <Row>
              <Chip style={styles.chip} marginBottom={10} title={t('free')} color={colors.danger} />
            </Row>
          ) : (
              <Row width="120%">
                {data?.discounted_price && data?.actual_price &&
                  <ScaleAnim>
                    <Chip
                      color={colors.success}
                      marginRight={5}
                      marginBottom={10}
                      title={
                        <>
                          <Text>{t('aed')} </Text>
                          <Text>{data?.discounted_price} </Text>
                          <Text style={styles.strike}>{data?.actual_price}</Text>
                        </>
                      }
                    />
                  </ScaleAnim>
                }
                <ScaleAnim>
                  <Chip
                    color={colors.chip_1}
                    marginBottom={10}
                    title={
                      language === 'en'
                        ? `${data?.discount || 0}% ${t('discount')}`
                        : `${t('discount')} ${data?.discount || 0}%`
                    }
                  />
                </ScaleAnim>
              </Row>
            )}
        </RippleFX>
      </Column>
      <Row flex={1} height="100%" vcenter hcenter>
        {userData && (
          <RippleFX style={styles.iconContainer} onPress={() => handleFavourite(data?.id)}>
            <ScaleAnim delay={1000}>
              <Icon
                name="heart"
                color={favourite ? colors.danger : colors.text_lite}
              />
            </ScaleAnim>
          </RippleFX>
        )}
      </Row>
    </Row>
  );
}

export default memo(Offer);
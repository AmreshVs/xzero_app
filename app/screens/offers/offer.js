import React, { useState, memo } from 'react';
import { Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Box from 'components/box';
import Row from 'components/row';
import colors from 'constants/colors';
import Chip from 'components/chip';
import { IMAGE_URL } from 'constants/common';
import Column from 'components/column';
import RippleFX from 'components/rippleFx';
import { OFFERS_SCREEN, OFFER_DETAIL } from 'navigation/routes';
import addFavourite from './addFavourite';
import useErrorLog from 'hooks/useErrorLog';
import styles from './styles';
import { useContext } from 'react';
import { UserDataContext } from 'context';
import { ToastMsg } from 'components/toastMsg';
import { isTab, thumbnailUrl } from 'constants/commonFunctions';

function Offer({ data, center, favourites }) {
  const client = useApolloClient();
  const { push } = useNavigation();
  const { userData } = useContext(UserDataContext);
  const { logError } = useErrorLog();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const [favourite, setFavourite] = useState(data.is_favourite);

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
      console.log('Add Favourite error', error);
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
          <Image source={{ uri: IMAGE_URL + (isTab() ? data?.featured_img?.url : thumbnailUrl(data?.featured_img?.url)) }} style={styles.image} />
        </RippleFX>
      </Box>
      <Column flex={6} style={styles.nameContainer}>
        <RippleFX onPress={() => handlePress()}>
          <Text style={styles.title} numberOfLines={2}>
            {data?.[`title_${language}`]}
          </Text>
          <Text style={styles.caption} numberOfLines={2}>
            {data?.[`desc_${language}`]}
          </Text>
          {data?.discount === 100 ? (
            <Chip style={styles.chip} title={t('free')} color={colors.danger} />
          ) : (
              <Chip
                style={styles.chip}
                title={
                  language === 'en'
                    ? `${data?.discount || 0}% ${t('discount')}`
                    : `${t('discount')} ${data?.discount || 0}%`
                }
                color={colors.chip_1}
              />
            )}
        </RippleFX>
      </Column>
      <Row flex={1} height="100%" vcenter hcenter>
        {userData && (
          <RippleFX style={styles.iconContainer} onPress={() => handleFavourite(data?.id)}>
            <FontAwesomeIcon
              icon="heart"
              size={22}
              color={favourite ? colors.danger : colors.text_lite}
            />
          </RippleFX>
        )}
      </Row>
    </Row>
  );
}

export default memo(Offer);
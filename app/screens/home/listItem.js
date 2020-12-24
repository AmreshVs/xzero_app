import React, { memo, useContext } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Box from 'components/box';
import Divider from 'components/divider';
import styles from './styles';
import RippleFX from 'components/rippleFx';
import { UserDataContext } from 'context';
import { OFFERS_SCREEN, OFFER_DETAIL, SPECIALIST_DETAIL } from 'navigation/routes';

const ListItem = ({ name, data }) => {
  const { push } = useNavigation();
  const { userData } = useContext(UserDataContext);
  const { i18n } = useTranslation();
  let language = i18n.language;

  const handlePress = (item) => {
    if (item?.__typename === 'Offers') {
      push(OFFER_DETAIL, {
        offer_id: Number(item.id),
        id: Number(item.id),
        user_id: Number(userData?.id) || 0,
        center: item?.[`title_${language}`]
      });
    }

    if (item?.__typename === 'Centers') {
      push(OFFERS_SCREEN, {
        center: Number(item?.id),
        user_id: Number(userData?.id) || 0
      });
    }

    if (item?.__typename === 'Specialist') {
      push(SPECIALIST_DETAIL, {
        id: Number(item?.id),
      });
    }
  };

  return (
    <Box marginBottom={10}>
      {data.length !== 0 && <Text style={styles.searchResultHeading}>{name}</Text>}
      {data !== undefined ?
        data?.map((item, index) => {
          return (
            <View key={index}>
              {index !== 0 && <Divider />}
              <RippleFX onPress={() => handlePress(item)}>
                <Box paddingVertical={7}>
                  <Text style={styles.resultText}>{item?.[`title_${language}`]}</Text>
                </Box>
              </RippleFX>
            </View>
          );
        })
        :
        null}
    </Box>
  );
};

export default memo(ListItem);
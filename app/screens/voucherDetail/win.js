import React, { memo, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';

import Card from 'components/card';
import Divider from 'components/divider';
import Chip from 'components/chip';
import Column from 'components/column';
import Box from 'components/box';
import Row from 'components/row';
import colors from 'constants/colors';
import { GET_GIFT_WINNERS } from 'graphql/queries';
import ProductSlider from './productSlider';
import styles from './styles';

const ShowWinners = ({ draw_status, voucher_id, gift }) => {
  const client = useApolloClient();
  const { t } = useTranslation();
  const [giftData, setGiftData] = useState([]);

  const getWinners = async () => {
    let { data } = await client.query({
      query: GET_GIFT_WINNERS,
      variables: {
        where: {
          voucher: Number(voucher_id),
          draw_gift_won: Number(gift),
          is_won: true
        }
      }
    });
    setGiftData(data?.voucherAvaileds);
  }

  if (draw_status === 'publish') {
    getWinners();
  }

  return (
    giftData.length > 0 && (
      <>
        <Box marginTop={10}>
          <Text style={styles.winners}>{giftData.length > 1 ? t('winners') : t('winner')}</Text>
        </Box>
        <Row>
          {giftData !== [] && giftData.map((item, index) =>
            <Box width="50%" key={index}>
              <Text style={styles.caption}>{index + 1}. {item.user?.username}</Text>
            </Box>
          )}
        </Row>
      </>
    )
  )
}

const Win = ({ voucher_id, draw_status, data }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Card marginBottom={10}>
      <Text style={styles.title}>{t('a_chance_to_win')}</Text>
      {data.map((gift, index) => {
        return (
          <View key={index}>
            {index !== 0 && <Divider marginVertical={20} />}
            <>
              <ProductSlider data={gift?.featured_imgs} />
              <Column marginTop={-20} marginBottom={5} alignItems="center">
                <Chip title={`${gift.quantity} ${gift.quantity > 1 ? t('winners') : t('winner')}`} color={colors.chip_1} />
              </Column>
              <Text style={styles.title}>{gift?.[`title_${language}`]}</Text>
              <Text style={styles.caption}>{gift?.[`desc_${language}`]}</Text>
              <ShowWinners
                voucher_id={voucher_id}
                draw_status={draw_status}
                gift={gift?.id}
              />
            </>
          </View>
        )
      })}
    </Card>
  )
}

export default memo(Win);
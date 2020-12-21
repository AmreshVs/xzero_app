import React from 'react';
import { Share, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Row from 'components/row';
import Button from 'components/button';
import Card from 'components/card';
import Box from 'components/box';
import styles from './styles';

const ShareOffer = ({ data }) => {
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  const handleShare = async () => {
    try {
      const centerName = String(data?.center?.[`title_${language}`]);
      let center = centerName.split(" ").join("%20");
      const message = `${t('offer')}:\n${data?.center?.[`title_${language}`]}\n${data?.[`desc_${language}`]}\n\nOriginal Price - ${data?.actual_price} ${t('aed')}\nDiscounted Price - ${data?.discounted_price} ${t('aed')}\nDiscount - ${data?.discount}%\n\ \n\nCheck this Offer on Xzero App\nhttps://xzero.app/open?q=xzero://Home/OfferDetail?offer_id=${Number(data.id)}&center=${center}`;
      await Share.share({
        message: message,
        title: message,
        subject: message,
        dialogTitle: 'Be a member and enjoy this benefit!'
      });
    } catch (error) {
      console.log('Share Offer error', error);
    }
  }

  return (
    <Row marginTop={10} width="48.7%">
      <Card style={styles.descContainer} marginBottom={10}>
        <Text style={styles.title} numberOfLines={1}>
          {t('share_offer')}
        </Text>
        <Box marginTop={10}>
          <Button
            status="chip_1"
            icon="share-alt"
            onPress={() => handleShare()}
          >
            {t('share')}
          </Button>
        </Box>
      </Card>
    </Row>
  );
};

export default ShareOffer;
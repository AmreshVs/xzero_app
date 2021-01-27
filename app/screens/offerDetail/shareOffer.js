import React, { memo } from 'react';
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
    let message = "";
    let freeMessage = "";
    try {
      const centerName = String(data?.center?.[`title_${language}`]);
      let center = centerName.split(" ").join("%20");
      message = `${t('offer')}:\n${data?.center?.[`title_${language}`]}\n${data?.[`desc_${language}`]}\n\n${t('original_price')} - ${data?.actual_price} ${t('aed')}\n${t('discounted_price')} - ${data?.discounted_price} ${t('aed')}\n${t('discount')} - ${data?.discount}%\n\n\n${t('check_offer_on_app')}\nhttps://xzero.app/open?q=xzero://DHome/Main/OfferDetail?offer_id=${Number(data.id)}&center=${center}`;
      freeMessage = `${t('offer')}:\n${data?.center?.[`title_${language}`]}\n${data?.[`desc_${language}`]}\n\n${t('discount')} - ${data?.discount}\n*${t('free')}*\n\n\n${t('check_offer_on_app')}\nhttps://xzero.app/open?q=xzero://DHome/Main/OfferDetail?offer_id=${Number(data.id)}&center=${center}`;

      if (data?.discount === 100) {
        message = freeMessage;
      }

      await Share.share({
        message: message,
        title: message,
        subject: message,
        dialogTitle: t('enjoy_the_benefits')
      });
    } catch (error) {
      // console.log('Share Offer error', error);
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
            icon="share_alt"
            onPress={() => handleShare()}
          >
            {t('share')}
          </Button>
        </Box>
      </Card>
    </Row>
  );
};

export default memo(ShareOffer);
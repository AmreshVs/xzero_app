import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Row from 'components/row';
import Card from 'components/card';
import Box from 'components/box';
import styles from './styles';

const PriceDetails = ({ offer, center }) => {
  const { t } = useTranslation();

  return (
    <Row marginTop={10}>
      <Card style={styles.descContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {t('offer')}
        </Text>
        <Row justifyContent="space-between">
          <Box flex={1}>
            <Text style={styles.descText}>{center}</Text>
          </Box>
          <Row paddingLeft={5}>
            {offer?.discounted_price && (
              <>
                <Text style={styles.discountPrice}>AED {offer?.discounted_price}</Text>
                <Text style={styles.originalPrice}>{offer?.actual_price}</Text>
              </>
            )}
          </Row>
        </Row>
      </Card>
    </Row>
  );
};

export default PriceDetails;
import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import colors from 'constants/colors';
import Row from 'components/row';
import Box from 'components/box';
import RippleFX from 'components/rippleFx';
import styles from './styles';

const Plan = ({ data, index, planIndex, setPlanData, setPromocodeData }) => {
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  return (
    <Card style={[styles.planCard, index === planIndex ? styles.selectedPlan : {}]}>
      <RippleFX style={styles.ripplePlan} rippleSize={200} onPress={() => {
        setPlanData({ index, data });
        setPromocodeData({ discountedPrice: data?.price });
      }}>
        <Row vcenter>
          <Box width="20%" alignItems="center">
            <View style={[styles.planColor, { borderColor: data?.color || '#EEE' }]}>
              <FontAwesomeIcon icon="credit-card" color={data?.color || colors.primary} size={25} />
            </View>
          </Box>
          <Box width="40%" paddingLeft={5}>
            <Text style={styles.planTitle}>{data?.[`name_${language}`]}</Text>
            <Text style={styles.caption}>{data?.duration} {t('months')}</Text>
          </Box>
          <Box width="40%" alignItems="flex-end">
            <Text style={styles.price}>{data?.price} {t('aed')}</Text>
          </Box>
        </Row>
      </RippleFX>
    </Card>
  );
};

export default Plan;
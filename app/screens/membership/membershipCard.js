import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

import Box from 'components/box';
import colors from 'constants/colors';
import Row from 'components/row';
import Column from 'components/column';
import { firstLetterUpper, getFormatedDate } from 'constants/commonFunctions';
import styles from './styles';

export default function MembershipCard({ member, data, expired }) {
  const { t } = useTranslation();

  return (
    <Box style={styles.memberContainer}>
      <LinearGradient
        colors={
          expired ? [colors.text_lite, colors.text_lite] : [colors.gradient1, colors.gradient2]
        }
        style={styles.gradient}
      >
        <Row hcenter>
          <Image source={require('../../../assets/loader.gif')} style={styles.logo} />
        </Row>
        <View style={styles.textContainer}>
          <Row spaceBetween vcenter>
            <Text style={styles.title}>XZERO</Text>
            <Column>
              {data?.package?.name_en && <Box style={styles.memberPlanTitleContainer}>
                <Text style={[styles.memberPlanTitle, { color: data?.package?.color || '#FFF' }]}>{data?.package?.name_en}</Text>
              </Box>}
              <Text style={styles.cardName}>{t('membership_card')}</Text>
            </Column>
          </Row>
          <View style={styles.serialContainer}>
            <Row spaceBetween>
              <Column>
                <Text style={styles.cardName}>{t('member_id')}</Text>
                <Text style={styles.title}>{member ? data?.serial || '' : 'XXXX-XXXX-XXXX'}</Text>
              </Column>
            </Row>
            <Row spaceBetween>
              <Column>
                <Text style={styles.cardName}>{t('belongs_to')}</Text>
                <Text style={styles.title}>
                  {member ? firstLetterUpper(data?.user?.username) || '' : 'XXXXXXX'}
                </Text>
              </Column>
              <Column>
                <Text style={styles.cardName}>{t('expiry')}</Text>
                <Text style={styles.title}>
                  {member ? getFormatedDate(new Date(data?.expiry)) : 'XX/XX/XXXX'}
                </Text>
              </Column>
            </Row>
          </View>
        </View>
      </LinearGradient>
    </Box>
  );
}
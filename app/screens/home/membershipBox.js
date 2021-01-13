import React, { memo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Box from 'components/box';
import Row from 'components/row';
import Divider from 'components/divider';
import Column from 'components/column';
import RippleFX from 'components/rippleFx';
import { getFormatedDate } from 'constants/commonFunctions';
import colors from 'constants/colors';
import { CENTERS_SCREEN, GIFTS, MEMBERSHIP_TAB_SCREEN, OFFERS_SCREEN, SPECIALISTS, VOUCHERS } from 'navigation/routes';
import styles from './styles';

const MembershipBox = ({ data, expiry }) => {

  const { navigate, push } = useNavigation();
  const { t } = useTranslation();

  const handleBuyMembership = () => {
    navigate(MEMBERSHIP_TAB_SCREEN);
  };

  return (
    <Box style={styles.membership} padding={10}>
      <View style={styles.membershipContainer}>
        <Row spaceBetween padding={10} paddingBottom={0}>
          <Text style={styles.title}>{t('my_membership')}</Text>
          {expiry && expiry !== null ? (
            <Text style={styles.secondaryText}>
              {t('expires_on')} {getFormatedDate(new Date(expiry))}
            </Text>
          ) : (
              <Text style={styles.buy} onPress={() => handleBuyMembership()}>
                {t('buy_membership_now')}
              </Text>
            )}
        </Row>
        <Divider margin={10} />
        <ScrollView horizontal={true}>
          <Row paddingBottom={10} spaceAround>
            <Column vcenter style={styles.countContainer}>
              <RippleFX
                style={[styles.iconContainer, styles.icon1]}
                onPress={() => push(CENTERS_SCREEN, { title: t('centers') })}
              >
                <FontAwesomeIcon icon="store" color="#b81fff" size={25} />
              </RippleFX>
              <Text style={styles.count}>{data.centersCount || 0}+</Text>
              <Text style={styles.secondaryText}>{t('centers')}</Text>
            </Column>
            <Column vcenter style={styles.countContainer}>
              <RippleFX
                style={[styles.iconContainer, styles.icon2]}
                onPress={() => push(OFFERS_SCREEN, { title: t('centers') })}
              >
                <FontAwesomeIcon icon="percentage" color={colors.primary} size={25} />
              </RippleFX>
              <Text style={styles.count}>{data.offersCount || 0}+</Text>
              <Text style={styles.secondaryText}>{t('offers')}</Text>
            </Column>
            <Column vcenter style={styles.countContainer}>
              <RippleFX
                style={[styles.iconContainer, styles.icon4]}
                onPress={() => push(SPECIALISTS, { title: t('specialist') })}
              >
                <FontAwesomeIcon icon="user-md" color={colors.chip_2} size={25} />
              </RippleFX>
              <Text style={styles.count}>{data.specialistsCount || 0}+</Text>
              <Text style={styles.secondaryText}>{t('specialist')}</Text>
            </Column>
            <Column vcenter style={styles.countContainer}>
              <RippleFX
                style={[styles.iconContainer, styles.icon5]}
                onPress={() => push(VOUCHERS)}
              >
                <FontAwesomeIcon icon="ticket-alt" color={styles.icon5Color.color} size={25} />
              </RippleFX>
              <Text style={styles.count}>{data.vouchersCount || 0}+</Text>
              <Text style={styles.secondaryText}>{t('vouchers')}</Text>
            </Column>
            <Column vcenter style={styles.countContainer}>
              <RippleFX
                style={[styles.iconContainer, styles.icon3]}
                onPress={() => push(GIFTS)}
              >
                <FontAwesomeIcon icon="gifts" color={colors.danger} size={25} />
              </RippleFX>
              <Text style={styles.count}>{data.giftsCount || 0}+</Text>
              <Text style={styles.secondaryText}>{t('gifts')}</Text>
            </Column>
          </Row>
        </ScrollView>
      </View>
    </Box>
  );
}

export default memo(MembershipBox);
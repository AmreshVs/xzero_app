import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';

import Box from 'components/box';
import Row from 'components/row';
import Divider from 'components/divider';
import Column from 'components/column';
import { getShadowStyle, getUserData, getFormatedDate } from 'constants/commonFunctions';
import colors from 'constants/colors';
import { getJWT } from 'constants/commonFunctions';
import { GET_MEMBERSHIP_BY_USER } from 'graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { MEMBERSHIP_TAB_SCREEN } from 'navigation/routes';

export default function MembershipBox({ data }) {
  const [expiry, setExpiry] = useState(null);
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const client = useApolloClient();

  useEffect(() => {
    checkMembership();
  }, []);

  const checkMembership = async () => {
    const jwt = await getJWT();
    if (jwt) {
      let { id } = await getUserData();
      let { data } = await client.query({
        query: GET_MEMBERSHIP_BY_USER,
        variables: {
          user_id: Number(id),
        },
        context: {
          headers: {
            Authorization: 'Bearer ' + jwt,
          },
        },
      });

      if (data?.memberships !== null && data?.memberships.length > 0) {
        setExpiry(data?.memberships[0].expiry);
      }
    }
  };

  const handleBuyMembership = () => {
    navigate(MEMBERSHIP_TAB_SCREEN);
  };

  return (
    <Box style={styles.membership} padding={10}>
      <View style={styles.membershipContainer}>
        <Row spaceBetween>
          <Text style={styles.title}>{t('my_membership')}</Text>
          {expiry ? (
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
        <Row spaceAround>
          <Column vcenter style={styles.countContainer}>
            <View style={[styles.iconContainer, styles.icon1]}>
              <FontAwesomeIcon icon="store" color="#b81fff" size={25} />
            </View>
            <Text style={styles.count}>{data.centersCount || 0}+</Text>
            <Text style={styles.secondaryText}>{t('centers')}</Text>
          </Column>
          <Column vcenter style={styles.countContainer}>
            <View style={[styles.iconContainer, styles.icon2]}>
              <FontAwesomeIcon icon="percentage" color={colors.primary} size={25} />
            </View>
            <Text style={styles.count}>{data.offersCount || 0}+</Text>
            <Text style={styles.secondaryText}>{t('offers')}</Text>
          </Column>
          <Column vcenter style={styles.countContainer}>
            <View style={[styles.iconContainer, styles.icon3]}>
              <FontAwesomeIcon icon="gifts" color={colors.danger} size={25} />
            </View>
            <Text style={styles.count}>100+</Text>
            <Text style={styles.secondaryText}>{t('gifts')}</Text>
          </Column>
        </Row>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  membership: {
    marginTop: -50,
    paddingBottom: 5,
  },
  membershipContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    ...getShadowStyle(),
  },
  secondaryText: {
    color: colors.text_lite,
  },
  title: {
    color: colors.text_dark,
    fontWeight: '700',
  },
  icon1: {
    backgroundColor: '#f0cfff',
  },
  icon2: {
    backgroundColor: colors.primary_lite,
  },
  icon3: {
    backgroundColor: '#ffb8c6',
  },
  count: {
    marginTop: 5,
    fontSize: 16,
    color: colors.text_dark,
    fontWeight: '700',
  },
  buy: {
    color: colors.danger,
  },
});

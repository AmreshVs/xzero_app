import React, { memo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Box from 'components/box';
import Row from 'components/row';
import Divider from 'components/divider';
import Column from 'components/column';
import RippleFX from 'components/rippleFx';
import { getFormatedDate } from 'constants/commonFunctions';
import colors from 'constants/colors';
import { CENTERS_SCREEN, FAVOURITES_TAB_SCREEN, GIFTS, MEMBERSHIP_TAB_SCREEN, OFFERS_SCREEN, SPECIALISTS, VOUCHERS } from 'navigation/routes';
import Icon from 'icon';
import styles from './styles';
import { FadeInUpAnim, FadeInLeftAnim, ScaleAnim, FadeAnim } from 'animation';

const MembershipBox = ({ data, expiry }) => {

  const { navigate, push } = useNavigation();
  const { t } = useTranslation();

  const handleBuyMembership = () => {
    navigate(MEMBERSHIP_TAB_SCREEN);
  };

  return (
    <Box style={styles.membership} padding={10}>
      <View style={styles.membershipContainer}>
        <FadeAnim>
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
        </FadeAnim>
        <Divider margin={10} />
        <ScrollView horizontal={true}>
          <Row paddingBottom={10} spaceAround>
            <ScaleAnim>
              <Column vcenter style={styles.countContainer}>
                <RippleFX
                  style={[styles.iconContainer, styles.icon6]}
                  onPress={() => push(FAVOURITES_TAB_SCREEN, { title: t('centers') })}
                >
                  <Icon name="heart" color="#ff0051" size={22} wviewBox={510} hviewBox={470} />
                </RippleFX>
                <Text style={styles.count}>{data.centersCount || 0}</Text>
                <Text style={styles.secondaryText}>{t('favourites')}</Text>
              </Column>
            </ScaleAnim>
            <ScaleAnim>
              <Column vcenter style={styles.countContainer}>
                <RippleFX
                  style={[styles.iconContainer, styles.icon1]}
                  onPress={() => push(CENTERS_SCREEN, { title: t('centers') })}
                >
                  <Icon name="store" color="#b81fff" size={25} wviewBox={620} hviewBox={490} />
                </RippleFX>
                <Text style={styles.count}>{data.centersCount || 0}</Text>
                <Text style={styles.secondaryText}>{t('centers')}</Text>
              </Column>
            </ScaleAnim>
            <ScaleAnim>
              <Column vcenter style={styles.countContainer}>
                <RippleFX
                  style={[styles.iconContainer, styles.icon2]}
                  onPress={() => push(OFFERS_SCREEN, { title: t('centers') })}
                >
                  <Icon name="percentage" color={colors.primary} size={22} wviewBox={400} />
                </RippleFX>
                <Text style={styles.count}>{data.offersCount || 0}</Text>
                <Text style={styles.secondaryText}>{t('offers')}</Text>
              </Column>
            </ScaleAnim>
            <ScaleAnim>
              <Column vcenter style={styles.countContainer}>
                <RippleFX
                  style={[styles.iconContainer, styles.icon4]}
                  onPress={() => push(SPECIALISTS, { title: t('specialist') })}
                >
                  <Icon name="user_md" color={colors.chip_2} size={25} wviewBox={450} />
                </RippleFX>
                <Text style={styles.count}>{data.specialistsCount || 0}</Text>
                <Text style={styles.secondaryText}>{t('specialist')}</Text>
              </Column>
            </ScaleAnim>
            <ScaleAnim>
              <Column vcenter style={styles.countContainer}>
                <RippleFX
                  style={[styles.iconContainer, styles.icon5]}
                  onPress={() => push(VOUCHERS)}
                >
                  <Icon name="ticket_alt" color={styles.icon5Color.color} size={25} wviewBox={580} />
                </RippleFX>
                <Text style={styles.count}>{data.vouchersCount || 0}</Text>
                <Text style={styles.secondaryText}>{t('vouchers')}</Text>
              </Column>
            </ScaleAnim>
            <ScaleAnim>
              <Column vcenter style={styles.countContainer}>
                <RippleFX
                  style={[styles.iconContainer, styles.icon3]}
                  onPress={() => push(GIFTS)}
                >
                  <Icon name="gifts" color={colors.danger} size={25} wviewBox={640} />
                </RippleFX>
                <Text style={styles.count}>{data.giftsCount || 0}</Text>
                <Text style={styles.secondaryText}>{t('gifts')}</Text>
              </Column>
            </ScaleAnim>
          </Row>
        </ScrollView>
      </View>
    </Box>
  );
}

export default memo(MembershipBox);
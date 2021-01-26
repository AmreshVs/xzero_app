import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Box from 'components/box';
import { ToastMsg } from 'components/toastMsg';
import colors from 'constants/colors';
import { isTab } from 'constants/commonFunctions';
import { SPECIALIST } from 'graphql/queries';
import useErrorLog from 'hooks/useErrorLog';
import { SPECIALIST_DETAIL } from 'navigation/routes';
import SpecialistInfo from './specialistInfo';
import AboutSpecialist from './aboutSpecialist';
import AboutCenter from './aboutCenter';
import ContactSpecialist from './contactSpecialist';
import styles from './styles';

const SpecialistDetail = () => {

  const { t, i18n } = useTranslation();
  const { logError } = useErrorLog();
  const userData = useReduxAction(state => state?.userReducer?.user);
  const { params } = useRoute();
  let language = i18n.language;

  const queryInput = {
    id: Number(params?.id)
  };

  const { data, loading, error } = useQuery(SPECIALIST, {
    variables: queryInput,
  });

  if (error) {
    ToastMsg(t('error_occured'));
    logError({
      screen: SPECIALIST_DETAIL,
      module: 'Get Specialist detail',
      input: JSON.stringify(queryInput),
      error: JSON.stringify(error)
    });
  }

  let specialist = data?.specialist;

  return (
    <>
      <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={styles.gradient} />
      <SafeView style={styles.container} topNav loading={loading}>
        <TopNavigator title={specialist?.[`name_${language}`]} color={colors.white} />
        <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true}>
          <SpecialistInfo specialist={specialist} />
          <AboutSpecialist specialist={specialist} />
          <Box justifyContent="space-between" flexDirection={isTab() ? 'row' : 'column'}>
            {specialist?.center && (
              <AboutCenter specialist={specialist} userData={userData} />
            )}
            <ContactSpecialist specialist={specialist} userData={userData} />
          </Box>
        </ScrollView>
      </SafeView>
    </>
  );
}

export default memo(SpecialistDetail);
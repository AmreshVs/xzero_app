import React from 'react';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import colors from 'constants/colors';
import TopNavigator from 'components/topNavigator';
import { SPECIALIST } from 'graphql/queries';
import useUserData from 'hooks/useUserData';
import SpecialistInfo from './specialistInfo';
import AboutSpecialist from './aboutSpecialist';
import AboutCenter from './aboutCenter';
import ContactSpecialist from './contactSpecialist';
import styles from './styles';

export default function SpecialistDetail() {
  const {
    params: { id },
  } = useRoute();
  const { data, loading } = useQuery(SPECIALIST, {
    variables: { id: Number(id) },
  });

  const { t, i18n } = useTranslation();
  let language = i18n.language;
  const userData = useUserData();

  let specialist = data?.specialist;

  return (
    <>
      <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={styles.gradient} />
      <SafeView style={styles.container} topNav loading={loading}>
        <TopNavigator title={specialist?.[`name_${language}`]} color={colors.white} />
        <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true}>
          <SpecialistInfo specialist={specialist} />
          <AboutSpecialist specialist={specialist} />
          {specialist?.center && (
            <AboutCenter specialist={specialist} userData={userData} />
          )}
          <ContactSpecialist specialist={specialist} userData={userData} />
        </ScrollView>
      </SafeView>
    </>
  );
}
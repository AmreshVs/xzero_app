import React, { memo } from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Row from 'components/row';
import Card from 'components/card';
import { FadeInUpAnim } from 'animation';
import styles from './styles';

const AboutSpecialist = ({ specialist }) => {
  const { t, i18n } = useTranslation();
  let language = i18n.language;

  return (
    <FadeInUpAnim delay={100}>
      <Card marginTop={10} style={styles.aboutSpecialist} shadow={false}>
        <Row>
          <Text style={styles.about} numberOfLines={1}>
            {t(`about_specialist`)}
          </Text>
          <Text style={[styles.caption, styles.noTopMargin]}>
            {specialist?.[`desc_${language}`]}
          </Text>
        </Row>
      </Card>
    </FadeInUpAnim>
  );
};

export default memo(AboutSpecialist);
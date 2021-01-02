import React, { useState, memo } from 'react';
import { View, Image, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Card from 'components/card';
import RippleFX from 'components/rippleFx';
import ProgressiveImage from 'components/progressiveImage';
import { IMAGE_URL } from 'constants/common';
import { thumbnailUrl } from 'constants/commonFunctions';
import styles from './styles';

const Gift = ({ data, availed }) => {
  const { i18n } = useTranslation();
  let language = i18n.language;
  const [showDesc, setShowDesc] = useState(false);

  return (
    <>
      <Card style={styles.availableGiftsContainer}>
        {showDesc && (
          <View style={styles.overlay}>
            <RippleFX style={styles.closeContainer} onPress={() => setShowDesc(!showDesc)}>
              <FontAwesomeIcon icon="times" color="#FFF" />
            </RippleFX>
            <Text style={styles.imageTitle}>{data?.[`name_${language}`]}</Text>
            <Text style={styles.imageDesc}>{data?.[`desc_${language}`]}</Text>
          </View>
        )}
        <RippleFX onPress={() => setShowDesc(!showDesc)}>
          <View style={styles.giftImageContainer}>
            <View style={styles.giftImages}>
              <ProgressiveImage
                source={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img?.url) }}
                style={styles.gift}
              />
            </View>
            <Image source={availed ? require('../../../assets/gift2.png') : require('../../../assets/gift3.png')} style={styles.giftImage} />
            <Text style={styles.title} numberOfLines={1}>{data?.[`name_${language}`]}</Text>
          </View>
        </RippleFX>
      </Card>
    </>
  );
};

export default memo(Gift);
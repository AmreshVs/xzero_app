import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Card from 'components/card';
import Box from 'components/box';
import RippleFX from 'components/rippleFx';
import ProgressiveImage from 'components/progressiveImage';
import Chip from 'components/chip';
import Row from 'components/row';
import colors from 'constants/colors';
import { IMAGE_URL } from 'constants/common';
import { NEWS_DETAIL } from 'navigation/routes';
import Icon from 'icon';
import styles from './styles';
import { thumbnailUrl } from 'constants/commonFunctions';

const News = ({ data }) => {
  const { push } = useNavigation();

  const params = {
    uri: 'https://www.pewresearch.org/wp-content/uploads/sites/8/2016/07/PJ_2016.07.07_Modern-News-Consumer_0-01.png',
    title: 'Hello welcome to the news! Checkout the latest news now!',
    posted_on: '20m'
  }

  const handlePress = () => {
    push(NEWS_DETAIL, {
      ...data
    });
  }

  return (
    <Card style={styles.newsContainer}>
      <RippleFX
        style={styles.newsImageContainer}
        onPress={() => handlePress()}
      >
        <ProgressiveImage
          style={styles.newsImage}
          thumbnailSource={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img?.url) }}
          source={{ uri: IMAGE_URL + data?.featured_img?.url }}
        />
      </RippleFX>
      <Row padding={10} paddingBottom={5} justifyContent="space-between" alignItems="center">
        <Chip borderRadius={5} textStyle={styles.chipText} title={data?.article_category?.category_name_en} color={data?.article_category?.color_code} numOfLines={1} maxWidth={120} />
        <RippleFX style={styles.bookmark}>
          <Icon name="bookmark" size={15} textStyle={styles.chipText} color={colors.ccc} hviewBox={520} wviewBox={400} />
        </RippleFX>
      </Row>
      <Box padding={10} paddingTop={0} paddingBottom={0} minHeight={50}>
        <RippleFX onPress={() => handlePress()}>
          <Text style={styles.newsTitle} numberOfLines={3}>{data?.title_en}</Text>
        </RippleFX>
      </Box>
      <Row padding={10} justifyContent="space-around" alignItems="center">
        <RippleFX>
          <Row vcenter maxWidth={50}>
            <Icon name="like" size={13} color={colors.gradient2} hviewBox={520} />
            <Text style={styles.newsCaption}>{data?.likes}</Text>
          </Row>
        </RippleFX>
        <Row vcenter maxWidth={50}>
          <Icon name="eye" size={15} color={colors.ccc} wviewBox={560} hviewBox={500} />
          <Text style={styles.newsCaption}>{data?.views}</Text>
        </Row>
        <Row vcenter maxWidth={50}>
          <Icon name="clock" size={13} color={colors.ccc} hviewBox={490} />
          <Text style={styles.newsCaption}>{params?.posted_on}</Text>
        </Row>
      </Row>
    </Card>
  )
}

export default News;
import React from 'react';
import { Text, View } from 'react-native';

import Row from 'components/row';
import styles from './styles';
import ProgressiveImage from 'components/progressiveImage';
import Card from 'components/card';
import Box from 'components/box';
import Chip from 'components/chip';
import colors from 'constants/colors';
import Column from 'components/column';
import Icon from 'icon';
import RippleFX from 'components/rippleFx';
import { IMAGE_URL } from 'constants/common';
import { thumbnailUrl } from 'constants/commonFunctions';
import { useNavigation } from '@react-navigation/native';
import { NEWS_DETAIL } from 'navigation/routes';

const Article = ({ data }) => {
  const { push } = useNavigation();

  const params = {
    uri: 'https://imagevars.gulfnews.com/2021/01/10/Stock-Dubai-skyline_176ebfa19ae_medium.jpg',
    title: 'Hello welcome to the news! Checkout the latest news now! and offers from xzero',
    posted_on: '20m'
  }

  const handleNavigate = () => {
    push(NEWS_DETAIL, {
      ...data
    });
  }

  return (
    <Card style={styles.articleContainer} padding={0}>
      <Row>
        <Box width="40%">
          <RippleFX onPress={() => handleNavigate()}>
            <ProgressiveImage
              thumbnailSource={{ uri: IMAGE_URL + thumbnailUrl(data?.featured_img?.url) }}
              source={{ uri: IMAGE_URL + data?.featured_img?.url }}
              style={styles.image}
            />
          </RippleFX>
        </Box>
        <Box width="60%" padding={10}>
          <Row marginBottom={5} justifyContent="space-between" alignItems="center">
            <Chip borderRadius={5} textStyle={styles.chipText} title={data?.article_category?.category_name_en} color={data?.article_category?.color_code} numOfLines={1} maxWidth={120} />
            <RippleFX style={styles.bookmark}>
              <Icon name="bookmark" size={17} color={data?.is_saved ? colors.danger : colors.ccc} hviewBox={520} wviewBox={400} />
            </RippleFX>
          </Row>
          <Box minHeight={55}>
            <RippleFX onPress={() => handleNavigate()}>
              <Text style={styles.title} numberOfLines={3}>{data?.title_en}</Text>
            </RippleFX>
          </Box>
          <Row marginTop={10} justifyContent="space-around" alignItems="center">
            <RippleFX>
              <Row vcenter maxWidth={70}>
                <Icon name="like" size={16} color={data?.is_liked ? colors.gradient2 : colors.ccc} hviewBox={520} />
                <Text style={styles.caption}>{data?.likes}</Text>
              </Row>
            </RippleFX>
            <Row vcenter maxWidth={70}>
              <Icon name="eye" size={19} color={colors.ccc} wviewBox={560} hviewBox={500} />
              <Text style={styles.caption}>{data?.views}</Text>
            </Row>
            <Row vcenter maxWidth={70}>
              <Icon name="clock" size={15} color={colors.ccc} hviewBox={490} />
              <Text style={styles.caption}>{params?.posted_on}</Text>
            </Row>
          </Row>
        </Box>
      </Row>
    </Card>
  )
}

export default Article;
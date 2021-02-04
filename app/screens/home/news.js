import React from 'react';
import { Text } from 'react-native';

import Card from 'components/card';
import styles from './styles';
import Box from 'components/box';
import RippleFX from 'components/rippleFx';
import { useNavigation } from '@react-navigation/native';
import { NEWS_DETAIL } from 'navigation/routes';
import ProgressiveImage from 'components/progressiveImage';
import Chip from 'components/chip';
import colors from 'constants/colors';
import Row from 'components/row';
import Icon from 'icon';

const News = () => {
  const { push } = useNavigation();

  const params = {
    uri: 'https://www.pewresearch.org/wp-content/uploads/sites/8/2016/07/PJ_2016.07.07_Modern-News-Consumer_0-01.png',
    title: 'Hello welcome to the news! Checkout the latest news now!',
    posted_on: '20m'
  }

  return (
    <Card style={styles.newsContainer}>
      <RippleFX onPress={() => push(NEWS_DETAIL, {
        ...params
      })}>
        <Box style={styles.newsImageContainer}>
          <ProgressiveImage style={styles.newsImage} source={{ uri: params?.uri }} />
        </Box>
        <Row padding={10} paddingBottom={5} justifyContent="space-between" alignItems="center">
          <Chip borderRadius={5} textStyle={styles.chipText} title="Category" color={colors.chip_1} numOfLines={1} maxWidth={120} />
          <RippleFX style={styles.bookmark}>
            <Icon name="bookmark" size={15} textStyle={styles.chipText} color={colors.ccc} hviewBox={520} wviewBox={400} />
          </RippleFX>
        </Row>
        <Box padding={10} paddingTop={0} paddingBottom={0}>
          <Text style={styles.newsTitle}>{params?.title}</Text>
        </Box>
        <Row padding={10} justifyContent="space-around" alignItems="center">
          <RippleFX>
            <Row vcenter maxWidth={50}>
              <Icon name="like" size={13} color={colors.gradient2} hviewBox={520} />
              <Text style={styles.newsCaption}>20k</Text>
            </Row>
          </RippleFX>
          <Row vcenter maxWidth={50}>
            <Icon name="eye" size={15} color={colors.ccc} wviewBox={560} hviewBox={500} />
            <Text style={styles.newsCaption}>20k</Text>
          </Row>
          <Row vcenter maxWidth={50}>
            <Icon name="clock" size={13} color={colors.ccc} hviewBox={490} />
            <Text style={styles.newsCaption}>{params?.posted_on}</Text>
          </Row>
        </Row>
      </RippleFX>
    </Card>
  )
}

export default News;
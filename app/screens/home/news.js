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

const News = () => {
  const { push } = useNavigation();

  const params = {
    uri: 'https://www.pewresearch.org/wp-content/uploads/sites/8/2016/07/PJ_2016.07.07_Modern-News-Consumer_0-01.png',
    title: 'Hello welcome to the news! Checkout the latest news now!',
    posted_on: '20 mins ago'
  }

  return (
    <Card style={styles.newsContainer}>
      <RippleFX onPress={() => push(NEWS_DETAIL, {
        ...params
      })}>
        <Box style={styles.newsImageContainer}>
          <ProgressiveImage style={styles.newsImage} source={{ uri: params?.uri }} />
        </Box>
        <Row padding={10} paddingBottom={0}>
          <Chip style={styles.category} title="Category" color={colors.chip_1} numOfLines={1} />
        </Row>
        <Box padding={10} paddingTop={5} paddingBottom={0}>
          <Text style={styles.newsTitle}>{params?.title}</Text>
        </Box>
        <Box padding={10} paddingTop={0}>
          <Text style={styles.newsCaption}>{params?.posted_on}</Text>
        </Box>
      </RippleFX>
    </Card>
  )
}

export default News;
import React from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';

import Video from 'screens/news/video';
import Box from 'components/box';
import Spinner from 'components/spinner';
import Row from 'components/row';
import colors from 'constants/colors';
import useErrorLog from 'hooks/useErrorLog';
import { HOME_SCREEN } from 'navigation/routes';
import { RECENT_ARTICLES } from 'graphql/queries';
import News from './news';
import styles from './styles';

const Stories = () => {
  const { logError } = useErrorLog();
  const { data, loading, error } = useQuery(RECENT_ARTICLES);

  if (error) {
    logError({
      screen: HOME_SCREEN,
      module: 'Home Query',
      input: '',
      error: JSON.stringify(error)
    });
  }

  let articles = data?.RecentArticles;

  return (
    loading ?
      <Row minHeight={50} vcenter hcenter>
        <Spinner color={colors.text_lite} />
      </Row>
      :
      <View style={styles.container}>
        {articles?.map((item, index) => (
          item?.video_url ?
            <Box style={styles.videoContainer} key={index}>
              <Video data={item} autoPlay={false} />
            </Box>
            :
            <News data={item} key={index} />
        ))}
      </View>
  )
}

export default Stories;
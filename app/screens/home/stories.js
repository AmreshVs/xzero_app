import React from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';

import { RECENT_ARTICLES } from 'graphql/queries';
import News from './news';
import Video from 'screens/news/video';
import styles from './styles';

const Stories = () => {

  const { data, loading, error } = useQuery(RECENT_ARTICLES);

  let articles = data?.RecentArticles;

  return (
    <>
      {articles?.recentVideos?.map((item, index) => (
        <Video data={item} key={index} autoPlay={false} />
      ))}
      <View style={styles.container}>
        {articles?.recentArticles?.map((item, index) => (
          <News data={item} key={index} />
        ))}
      </View>
    </>
  )
}

export default Stories;
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Viewport } from '@skele/components';

import Box from 'components/box';
import Article from './article';
import Video from './video';
import styles from './styles';
import Spinner from 'components/spinner';
import VHCenter from 'components/vhCenter';
import colors from 'constants/colors';
import { useQuery } from '@apollo/client';
import { GET_ARTICLES } from 'graphql/queries';

const RenderArticles = ({ category }) => {

  let input = {
    user: 65
  };

  if (category == 2) {
    input = {
      ...input,
      is_liked: true
    }
  }

  if (category > 2) {
    input = {
      ...input,
      article_category: Number(category)
    }
  }

  const { data, loading, error } = useQuery(GET_ARTICLES, {
    variables: {
      input
    }
  });

  return (
    <Viewport.Tracker>
      <ScrollView
        style={styles.articlesScrollView}
        scrollEventThrottle={16}
        initialNumToRender={4}
        removeClippedSubviews={true}
      >
        {loading ?
          (
            <VHCenter>
              <Spinner color={colors.primary} />
            </VHCenter>
          )
          :
          data?.GetArticles?.map((item, index) => {
            return (
              <View key={index}>
                {!item?.video_url ?
                  <Article data={item} />
                  :
                  <Video data={item} />
                }
                {index === data?.GetArticles.length - 1 && (
                  <Box marginBottom={10} />
                )}
              </View>
            )
          })
        }
      </ScrollView>
    </Viewport.Tracker>
  );
};

export default RenderArticles;
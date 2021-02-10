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
import { GET_ARTICLES, SAVED_ARTICLES } from 'graphql/queries';
import NoData from 'components/noData';
import { ANIM_COMPONENT_DELAY, SCREEN_HEIGHT } from 'constants/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInUpAnim } from 'animation';

const RenderArticles = ({ category }) => {
  const insets = useSafeAreaInsets();

  let input = {
    user: 65
  };

  if (category == 2) {
    input = {}
  }

  if (category > 2) {
    input = {
      ...input,
      article_category: Number(category)
    }
  }

  const { data, loading, refetch: _refetch, error } = useQuery(category == 2 ? SAVED_ARTICLES : GET_ARTICLES, {
    variables: {
      input,
      user_id: 65
    }
  });

  let articles = category == 2 ? data?.SavedArticlesByUser : data?.GetArticles;
  let outerScrollViewHeight = SCREEN_HEIGHT - (108 + insets.bottom + insets.top);
  let innerScrollViewHeight = SCREEN_HEIGHT - (127 + insets.bottom + insets.top);

  return (
    <Viewport.Tracker>
      <ScrollView
        style={[styles.articlesScrollView, { height: outerScrollViewHeight }]}
        scrollEventThrottle={16}
        initialNumToRender={4}
        removeClippedSubviews={true}
      >
        {loading ?
          (
            <VHCenter height={innerScrollViewHeight}>
              <Spinner color={colors.primary} />
            </VHCenter>
          )
          :
          data && articles?.length <= 0 ?
            <Box style={styles.noDataContainer} height={SCREEN_HEIGHT - (127 + insets.bottom + insets.top)}>
              <NoData imageStyle={styles.noDataImage} />
            </Box>
            :
            articles?.map((item, index) => {
              return (
                <FadeInUpAnim key={index} delay={index * ANIM_COMPONENT_DELAY}>
                  {!item?.video_url ?
                    <Article data={item} refetch={_refetch} savedTab={category == 2} />
                    :
                    <Video data={item} refetch={_refetch} savedTab={category == 2} />
                  }
                  {index === articles.length - 1 && (
                    <Box marginBottom={10} />
                  )}
                </FadeInUpAnim>
              )
            })
        }
      </ScrollView>
    </Viewport.Tracker>
  );
};

export default RenderArticles;
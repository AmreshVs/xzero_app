import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Viewport } from '@skele/components';
import { useQuery } from '@apollo/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Box from 'components/box';
import Spinner from 'components/spinner';
import VHCenter from 'components/vhCenter';
import NoData from 'components/noData';
import colors from 'constants/colors';
import { ANIM_COMPONENT_DELAY, SCREEN_HEIGHT } from 'constants/common';
import { useReduxAction } from 'constants/commonFunctions';
import { GET_ARTICLES, SAVED_ARTICLES } from 'graphql/queries';
import useErrorLog from 'hooks/useErrorLog';
import { NEWS } from 'navigation/routes';
import { FadeInUpAnim } from 'animation';
import Article from './article';
import Video from './video';
import styles from './styles';

const RenderArticles = ({ category }) => {
  const insets = useSafeAreaInsets();
  const [reloading, setReloading] = useState(false);
  const { logError } = useErrorLog();
  const userData = useReduxAction(state => state?.userReducer?.user);

  let input = {
    user: Number(userData?.id)
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
      user_id: Number(userData?.id)
    }
  });

  if (error) {
    logError({
      screen: NEWS,
      module: 'News Query',
      input: '',
      error: JSON.stringify(error)
    });
  }

  let articles = category == 2 ? data?.SavedArticlesByUser : data?.GetArticles;
  let innerScrollViewHeight = SCREEN_HEIGHT - (127 + insets.bottom + insets.top);

  const reload = async () => {
    setReloading(true);
    await _refetch();
    setReloading(false);
  };

  if (loading) {
    return (
      <VHCenter width="100%" height={innerScrollViewHeight}>
        <Spinner color={colors.primary} />
      </VHCenter>
    )
  }

  else if (data && articles?.length <= 0) {
    return (
      <Box style={styles.noDataContainer} height={SCREEN_HEIGHT - (100 + insets.bottom + insets.top)}>
        <NoData imageStyle={styles.noDataImage} />
      </Box>
    )
  }

  else {
    return (
      <Viewport.Tracker>
        <FlatList
          keyExtractor={(item) => String(item.id)}
          data={articles}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
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
          )}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          windowSize={10}
          contentContainerStyle={[styles.articlesScrollView, { paddingBottom: insets.bottom ? insets.bottom + insets.top + 30 : 110 }]}
          refreshing={reloading}
          onRefresh={() => reload()}
        />
      </Viewport.Tracker>
    )
  }
};

export default RenderArticles;
import React from 'react';
import { ScrollView } from 'react-native';
import { Viewport } from '@skele/components';

import Box from 'components/box';
import Article from './article';
import Video from './video';
import styles from './styles';

const RenderArticles = () => {
  return (
    <Viewport.Tracker>
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        initialNumToRender={4}
        removeClippedSubviews={true}
      >
        <Article />
        <Article />
        <Video key={1} index={1} />
        <Article />
        <Article />
        <Video key={2} index={2} />
        <Article />
        <Article />
        <Video key={3} index={3} />
        <Article />
        <Video key={4} index={4} />
        <Article />
        <Article />
        <Video key={5} index={5} />
        <Article />
        <Video key={6} index={6} />
        <Box marginBottom={10} />
      </ScrollView>
    </Viewport.Tracker>
  );
};

export default RenderArticles;
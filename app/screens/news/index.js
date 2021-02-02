import React from 'react';
import { ScrollView, View } from 'react-native';
import { Viewport } from '@skele/components';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Article from './article';
import styles from './styles';
import Video from './video';

const NewsDetail = () => {
  return (
    <SafeView topNav noBottom>
      <TopNavigator
        title={'News'}
        gradient
      />
      <Viewport.Tracker>
        <ScrollView style={styles.container} scrollEventThrottle={5}>
          <Article />
          <Article />
          <Video key={1} />
          <Video key={2} />
          <Video key={3} />
          <Video key={4} />
          <Video key={5} />
          <Video key={6} />
        </ScrollView>
      </Viewport.Tracker>
    </SafeView>
  )
}

export default NewsDetail;


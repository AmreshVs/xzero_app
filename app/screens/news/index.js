import React, { useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Viewport } from '@skele/components';

import SafeView from 'components/safeView';
import TopNavigator from 'components/topNavigator';
import Article from './article';
import styles from './styles';
import Video from './video';
import RippleFX from 'components/rippleFx';

const categories = [
  { name: 'Beauty' },
  { name: 'Health' },
  { name: 'Gym' },
  { name: 'Spa' },
  { name: 'Specialist' },
  { name: 'News' },
  { name: 'Konoz' },
  { name: 'User' },
  { name: 'Beauty' },
]

const NewsDetail = () => {

  const [selected, setSelected] = useState(0);
  const [xPosition, setXPosition] = useState(0);
  let tabView = useRef(null);
  let position = 0;

  const handleTabSelect = (index) => {
    position = index >= selected ? index * 80 : xPosition / 1.5;
    tabView.current.scrollTo({ x: position, y: 0, animated: true });
    setXPosition(position);
    setSelected(index);
  }

  const RenderItem = ({ index, item }) => {
    return (
      <RippleFX style={selected === index ? styles.selectedTab : styles.tab} onPress={() => handleTabSelect(index)}>
        <Text style={styles.chip}>
          {item.name}
        </Text>
      </RippleFX>
    )
  }

  return (
    <SafeView topNav noBottom>
      <TopNavigator
        title={'News'}
        gradient
      />
      <ScrollView horizontal={true} ref={tabView} showsHorizontalScrollIndicator={false}>
        {categories.map((item, index) => {
          return <RenderItem index={index} item={item} key={index} />
        })}
      </ScrollView>
      <Viewport.Tracker>
        <ScrollView style={styles.container} scrollEventThrottle={16} removeClippedSubviews={true} initialNumToRender={2}>
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
        </ScrollView>
      </Viewport.Tracker>
    </SafeView>
  )
}

export default NewsDetail;


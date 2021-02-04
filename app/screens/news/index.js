import React, { useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Viewport } from '@skele/components';

import SafeView from 'components/safeView';
import Article from './article';
import styles from './styles';
import Video from './video';
import RippleFX from 'components/rippleFx';
import Icon from 'icon';
import Box from 'components/box';
import { LinearGradient } from 'expo-linear-gradient';
import colors from 'constants/colors';

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
    let categoriesLength = categories.length;

    if (index > selected) {
      if ([categoriesLength - 1, categoriesLength - 2, categoriesLength - 3].includes(index)) {
        position = categoriesLength * 90;
      }
      else {
        position = index * 100;
      }
    }
    else {
      if ([0, 1, 2].includes(index)) {
        position = 0;
      }
      else if (index === categoriesLength - 3) {
        position = xPosition - 150;
      }
      else {
        position = xPosition - 100;
      }
    }

    tabView.current.scrollTo({ x: position, y: 0, animated: true });
    setXPosition(position);
    setSelected(index);
  }

  const RenderItem = ({ index, item }) => {
    return (
      <RippleFX style={[selected === index ? styles.selectedTab : styles.tab, index === categories.length - 1 ? { marginRight: 10 } : {}]} onPress={() => handleTabSelect(index)}>
        <Box style={styles.chipContainer}>
          <Icon name="archive" size={15} color={selected === index ? colors.primary : colors.text_lite} />
          <Text style={selected === index ? styles.selectedChip : styles.chip}>
            {item.name}
          </Text>
        </Box>
      </RippleFX>
    )
  }

  return (
    <SafeView topNav noBottom>
      <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={styles.gradient} />
      <ScrollView
        ref={tabView}
        style={styles.categories}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
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
          <Box marginBottom={10} />
        </ScrollView>
      </Viewport.Tracker>
    </SafeView>
  )
}

export default NewsDetail;


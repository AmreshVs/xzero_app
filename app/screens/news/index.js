import React, { useRef, useState } from 'react';
import { ScrollView, Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SafeView from 'components/safeView';
import RippleFX from 'components/rippleFx';
import Box from 'components/box';
import colors from 'constants/colors';
import Icon from 'icon';
import { getPosition } from './helpers';
import styles from './styles';
import { useQuery } from '@apollo/client';
import { GET_ARTICLE_CATEGORIES } from 'graphql/queries';
import Loader from 'components/loader';
import { useEffect } from 'react';
import RenderArticles from './renderArticles';

const categories = [
  { id: 1, name: 'Beauty' },
  { id: 2, name: 'Health' },
  { id: 3, name: 'Gym' },
  { id: 4, name: 'Spa' },
  { id: 5, name: 'Specialist' },
  { id: 6, name: 'News' },
  { id: 7, name: 'Konoz' },
  { id: 8, name: 'User' },
  { id: 9, name: 'Beauty' },
];

const NewsDetail = () => {
  const [xPosition, setXPosition] = useState(0);
  const [selected, setSelected] = useState(0);
  const insets = useSafeAreaInsets();
  let tabView = useRef(null);

  const { data, loading, error } = useQuery(GET_ARTICLE_CATEGORIES, {
    variables: {
      input: {
        user: 65,
      }
    }
  });

  useEffect(() => {
    if (!loading && data?.articleCategories[0].id) {
      setSelected(data?.articleCategories[0].id);
    }
  }, [data]);

  const handleTabSelect = (index) => {
    let categoriesLength = categories.length;
    let position = getPosition(index, categoriesLength, xPosition, selected);
    tabView.current.scrollTo({ x: position, y: 0, animated: true });
    setXPosition(position);
    setSelected(index);
  }

  const RenderItem = ({ item }) => {
    return (
      <RippleFX
        style={[selected === item.id ? styles.selectedTab : styles.tab, item.id === categories.length - 1 ? { marginRight: 10 } : {}]}
        onPress={() => handleTabSelect(item.id)}
      >
        <Box style={styles.chipContainer}>
          <Icon d={item.icon} size={15} color={selected === item.id ? colors.primary : colors.text_lite} />
          <Text style={selected === item.id ? styles.selectedChip : styles.chip}>
            {item.category_name_en}
          </Text>
        </Box>
      </RippleFX>
    )
  }

  return (
    loading ? <Loader />
      :
      <SafeView topNav noBottom>
        <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={[styles.gradient, { height: insets.top + 47.4 }]} />
        <ScrollView
          ref={tabView}
          style={styles.categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {data?.articleCategories.map((item, index) => {
            return <RenderItem item={item} key={index} />
          })}
        </ScrollView>
        <RenderArticles />
      </SafeView>
  )
}

export default NewsDetail;
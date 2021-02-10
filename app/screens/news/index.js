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
import Column from 'components/column';

const NewsDetail = () => {
  const [xPosition, setXPosition] = useState(0);
  const [selected, setSelected] = useState(0);
  const insets = useSafeAreaInsets();
  let tabView = useRef(null);

  const { data, loading, error } = useQuery(GET_ARTICLE_CATEGORIES);

  useEffect(() => {
    if (!loading && data?.articleCategories[0].id && ![0, 1].includes(data?.articleCategories[0].id)) {
      setSelected(data?.articleCategories[0].id);
    }
  }, [data]);

  const handleTabSelect = (id, index) => {
    let categoriesLength = data?.articleCategories?.length;
    let position = getPosition(index, categoriesLength, xPosition, selected, id);
    tabView.current.scrollTo({ x: position, y: 0, animated: true });
    setXPosition(position);
    setSelected(id);
  }

  const RenderItem = ({ item, index }) => {
    return (
      <RippleFX
        style={[selected === item.id ? styles.selectedTab : styles.tab, index === data?.articleCategories?.length - 1 ? { marginRight: 10 } : {}]}
        onPress={() => handleTabSelect(item.id, index)}
      >
        <Box style={styles.chipContainer}>
          <Icon d={item.icon} size={15} color={selected === item.id ? colors.primary : colors.text_lite} wviewBox={550} hviewBox={450} />
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
        <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={[styles.gradient, { height: insets.top + 55 }]} />
        <Column>
          <ScrollView
            ref={tabView}
            style={styles.categories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {data?.articleCategories.map((item, index) => {
              return <RenderItem item={item} key={index} index={index} />
            })}
          </ScrollView>
          <RenderArticles category={selected} />
        </Column>
      </SafeView>
  )
}

export default NewsDetail;
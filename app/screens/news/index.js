import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import SafeView from 'components/safeView';
import RippleFX from 'components/rippleFx';
import Box from 'components/box';
import Loader from 'components/loader';
import Column from 'components/column';
import colors from 'constants/colors';
import { NEWS } from 'navigation/routes';
import useErrorLog from 'hooks/useErrorLog';
import { GET_ARTICLE_CATEGORIES } from 'graphql/queries';
import Icon from 'icon';
import { getPosition } from './helpers';
import RenderArticles from './renderArticles';
import styles from './styles';

const NewsDetail = () => {
  const [xPosition, setXPosition] = useState(0);
  const [selected, setSelected] = useState(0);
  const { i18n } = useTranslation();
  const { logError } = useErrorLog();
  const insets = useSafeAreaInsets();
  let tabView = useRef(null);
  let language = i18n.language;

  const { data, loading, error } = useQuery(GET_ARTICLE_CATEGORIES);

  useEffect(() => {
    if (!loading && data?.articleCategories[0].id && ![0, 1].includes(data?.articleCategories[0].id)) {
      setSelected(data?.articleCategories[0].id);
    }
  }, [data]);

  if (error) {
    logError({
      screen: NEWS,
      module: 'Articles Category',
      input: '',
      error: JSON.stringify(error)
    });
  }

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
            {item?.[`category_name_${language}`]}
          </Text>
        </Box>
      </RippleFX>
    )
  }

  return (
    loading ? <Loader />
      :
      <SafeView topNav noBottom>
        <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={[styles.gradient, { height: insets.top ? insets.top + 55 : 56 }]} />
        <Column>
          <ScrollView
            ref={tabView}
            style={[styles.categories, { height: insets.top ? insets.top + 15 : 60 }]}
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
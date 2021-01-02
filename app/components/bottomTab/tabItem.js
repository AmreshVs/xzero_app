import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from 'constants/colors';
import RippleFX from 'components/rippleFx';
import getIconName from './getIconName';
import style from "./style";
import { MEMBERSHIP_TAB_SCREEN } from 'navigation/routes';
import { useTranslation } from 'react-i18next';

const TabItem = ({ options, route, index, state, navigation }) => {
  const insets = useSafeAreaInsets();
  const styles = style(insets, state?.history.length);
  const isFocused = state.index === index;
  const selectedTabTextAnim = useRef(new Animated.Value(-2)).current;
  const { t } = useTranslation();

  useEffect(() => {
    if (isFocused) {
      onPress();
    }
  }, [isFocused]);

  const label = options.tabBarLabel !== undefined
    ? options.tabBarLabel
    : options.title !== undefined
      ? options.title
      : route.name;

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
    });

    Animated.timing(selectedTabTextAnim, {
      toValue: -20,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, {
        drawer: true
      });
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <View style={styles.tabItem} key={index}>
      <RippleFX
        accessibilityRole="button"
        accessibilityStates={isFocused ? ['selected'] : []}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={route.name === MEMBERSHIP_TAB_SCREEN ? styles.memberIconContainer : styles.iconContainer}
      >
        <FontAwesomeIcon
          icon={getIconName(route.name)}
          color={route.name === MEMBERSHIP_TAB_SCREEN ? colors.white : isFocused ? colors.primary : colors.text_lite}
          size={22}
        />
      </RippleFX>
      {route.name !== MEMBERSHIP_TAB_SCREEN ? isFocused && (
        <Animated.Text
          style={[styles.itemText, {
            color: colors?.primary,
            transform: [{ translateY: selectedTabTextAnim }]
          }]}
          numberOfLines={1}
        >
          {t(label)}
        </Animated.Text>
      ) : null}
    </View>
  );
};

export default TabItem;
import React, { useRef, useEffect, memo } from 'react';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import colors from 'constants/colors';
import RippleFX from 'components/rippleFx';
import { MEMBERSHIP_TAB_SCREEN } from 'navigation/routes';
import Icon from 'icon';
import getIconName from './getIconName';
import style from "./style";

const TabItem = ({ options, route, index, state, navigation }) => {
  const insets = useSafeAreaInsets();
  const styles = style(insets, state?.history.length);
  const isFocused = state.index === index;
  const selectedTabTextAnim = useRef(new Animated.Value(0)).current;
  const selectedTabView = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();

  useEffect(() => {
    if (isFocused) {
      onPress();
    }

    if (!isFocused) {
      focusOut();
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
      toValue: -5,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(selectedTabView, {
      toValue: -10,
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

  const focusOut = () => {
    Animated.timing(selectedTabTextAnim, {
      toValue: -20,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(selectedTabView, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.tabItem, {
        transform: [{
          translateY: route.name !== MEMBERSHIP_TAB_SCREEN ? selectedTabView : 0,
        }],
      }]}
      key={index}
    >
      <RippleFX
        accessibilityRole="button"
        accessibilityStates={isFocused ? ['selected'] : []}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={route.name === MEMBERSHIP_TAB_SCREEN ? isFocused ? styles.memberIconContainerFocused : styles.memberIconContainer : isFocused ? styles.iconContainerFocused : styles.iconContainer}
        rippleColor={colors?.primary}
      >
        <Icon
          name={getIconName(route.name)}
          color={route.name === MEMBERSHIP_TAB_SCREEN ? isFocused ? colors.primary : colors.white : isFocused ? colors.primary : colors.text_lite}
          size={22}
          style={styles.icon}
          wviewBox={560}
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
    </Animated.View>
  );
};

export default memo(TabItem);
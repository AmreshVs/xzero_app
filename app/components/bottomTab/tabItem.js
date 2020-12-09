import React, { useRef } from 'react';
import { View, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from 'constants/colors';
import RippleFX from 'components/rippleFx';
import getIconName from './getIconName';
import style from "./style";

const TabItem = ({ options, route, index, state, navigation }) => {
  const insets = useSafeAreaInsets();
  const styles = style(insets, state?.history.length);
  const isFocused = state.index === index;
  const selectedTabTextAnim = useRef(new Animated.Value(-2)).current;

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
      navigation.navigate(route.name);
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
        style={route.name === 'Member' ? styles.memberIconContainer : styles.iconContainer}
      >
        <FontAwesomeIcon
          icon={getIconName(route.name)}
          color={route.name === 'Member' ? colors.white : isFocused ? colors.primary : colors.text_lite}
          size={22}
        />
      </RippleFX>
      {route.name !== 'Member' ? isFocused && <Animated.Text style={[styles.itemText, { color: colors?.primary, transform: [{ translateY: selectedTabTextAnim }] }]}>{label}</Animated.Text> : null}
    </View>
  );
};

export default TabItem;
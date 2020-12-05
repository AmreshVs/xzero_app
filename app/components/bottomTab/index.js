import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from 'constants/colors';
import RippleFX from 'components/rippleFx';
import getIconName from './getIconName';
import isIphoneX from './isIphoneX';

export default function BottomTab({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    tabContainer: {
      backgroundColor: colors.white,
      flexDirection: 'row',
      paddingBottom: isIphoneX() ? insets.bottom : 0,
      borderWidth: 2,
      borderColor: colors.gray,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      padding: 5,
    },
    iconContainer: {
      alignItems: 'center',
      padding: 10,
      borderRadius: 50,
      overflow: 'hidden',
    },
    memberIconContainer: {
      alignItems: 'center',
      padding: 16,
      borderRadius: 50,
      overflow: 'hidden',
      backgroundColor: colors.primary,
      marginTop: -10,
      position: 'absolute',
      borderWidth: 2,
      borderColor: colors.text_lite
    },
  });

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

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

        if (route.name === 'Member') {
          return (
            <View style={styles.tabItem} key={index}>
              <RippleFX
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.memberIconContainer}
              >
                <FontAwesomeIcon
                  icon={getIconName(route.name)}
                  color={colors.white}
                  size={26}
                />
                {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>{label}</Text> */}
              </RippleFX>
            </View>
          )
        }

        return (
          <View style={styles.tabItem} key={index}>
            <RippleFX
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.iconContainer}
            >
              <FontAwesomeIcon
                icon={getIconName(route.name)}
                color={isFocused ? colors.primary : colors.text_lite}
                size={22}
              />
              {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>{label}</Text> */}
            </RippleFX>
          </View>
        );
      })}
    </View>
  );
}

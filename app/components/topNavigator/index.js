import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import RippleFX from 'components/rippleFx';
import colors from 'constants/colors';
import isIphoneX from 'components/bottomTab/isIphoneX';

export default function TopNavigator({
  title,
  style,
  color,
  rightContainer,
  gradient = false,
  leftIcon = true,
  leftClick = null,
  leftIconName = 'arrow-left',
}) {
  const { pop } = useNavigation();

  return (
    <>
      {gradient && (
        <LinearGradient colors={[colors.gradient1, colors.gradient2]} style={styles.gradient} />
      )}
      <View style={[style, styles.container]}>
        <RippleFX
          style={styles.backContainer}
          onPress={() => (leftIcon && !leftClick ? pop() : leftClick())}
        >
          {leftIcon && (
            <FontAwesomeIcon
              color={gradient || color ? colors.white : colors.text_dark}
              icon={leftIconName}
            />
          )}
        </RippleFX>
        <View style={styles.titleContainer}>
          <Text style={gradient || color ? styles.gtitle : styles.title}>{title}</Text>
        </View>
        {rightContainer ? rightContainer : <View style={{ flex: 1 }} />}
      </View>
    </>
  );
}

const centerStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
  },
  backContainer: {
    width: 50,
    ...centerStyle,
    borderRadius: 70,
    overflow: 'hidden',
  },
  titleContainer: {
    ...centerStyle,
    flex: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  gtitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  gradient: {
    width: '100%',
    height: isIphoneX() ? 98 : 74,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

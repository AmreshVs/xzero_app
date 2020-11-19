import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from 'constants/colors';
import RippleFX from 'components/rippleFx';
import Spinner from 'components/spinner';

export default function Button({
  children,
  outline,
  status,
  onPress,
  icon,
  iconColor,
  width,
  color,
  loading,
  disabled,
  style,
  size = "big",
}) {
  const styles = getStyles(colors, status, width, color, size);
  let buttonStyle = outline ? styles.outlineButton : styles.button;
  let textStyle = outline ? styles.outlineText : styles.text;

  return (
    <View style={styles.btnContainer}>
      {disabled || loading && <View style={styles.disabled} />}
      <RippleFX onPress={onPress || null}>
        <View style={[style, buttonStyle]}>
          {loading ? (
            <Spinner />
          ) : (
              <>
                {icon && (
                  <FontAwesomeIcon
                    style={styles.icon}
                    icon={icon}
                    color={iconColor || colors.white}
                  />
                )}
                <Text style={textStyle}>{children}</Text>
              </>
            )}
        </View>
      </RippleFX>
    </View>
  );
}

const getStyles = (colors, status, width, color, size) => {
  let btnColor = colors[status] || colors.primary;
  let centerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    btnContainer: {
      borderRadius: 30,
      width: width || '100%',
      overflow: 'hidden',
    },
    button: {
      backgroundColor: btnColor,
      padding: size === 'small' ? 8 : 14,
      borderRadius: 30,
      ...centerStyle,
    },
    outlineButton: {
      borderColor: color || btnColor,
      borderWidth: 2,
      padding: 14,
      borderRadius: 30,
      ...centerStyle,
    },
    text: {
      color: color || colors.white,
      fontSize: 16,
      fontWeight: '700',
    },
    outlineText: {
      color: color || btnColor,
      fontSize: 16,
      fontWeight: '700',
    },
    icon: {
      marginRight: 10,
    },
    disabled: {
      backgroundColor: '#FFF',
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: 1,
      opacity: 0.2,
    },
  });
};

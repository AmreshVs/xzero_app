import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import colors from 'constants/colors';
import RippleFX from 'components/rippleFx';
import Spinner from 'components/spinner';
import Icon from 'icon';

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
  timeout = true
}) {
  const [btnDisabled, setBtnDisabled] = useState(disabled || false);
  const styles = getStyles(colors, status, width, color, size);
  let buttonStyle = outline ? styles.outlineButton : styles.button;
  let textStyle = outline ? styles.outlineText : styles.text;

  const handlePress = () => {
    setBtnDisabled(true);
    onPress();
    if (timeout) {
      setTimeout(() => {
        setBtnDisabled(disabled || false);
      }, 1000);
    }
  }

  useEffect(() => {
    if (disabled !== undefined && disabled !== btnDisabled) {
      setBtnDisabled(disabled);
    }
  }, [disabled]);

  return (
    <View style={styles.btnContainer}>
      {(btnDisabled || loading) && <View style={styles.disabled} />}
      <RippleFX onPress={handlePress || null}>
        <View style={[style, buttonStyle]}>
          {loading ? (
            <Spinner color={outline ? colors[status] : '#FFF'} />
          ) : (
              <>
                {icon && (
                  <Icon
                    style={styles.icon}
                    name={icon}
                    color={iconColor ? iconColor : outline ? colors[status] : colors.white}
                    wviewBox={630}
                  />
                )}
                <Text style={textStyle}>{children}</Text>
              </>
            )}
        </View>
      </RippleFX>
    </View >
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
      padding: size === 'small' ? 7 : 12,
      borderRadius: 30,
      ...centerStyle,
    },
    outlineButton: {
      borderColor: color || btnColor,
      borderWidth: 1.5,
      padding: size === 'small' ? 6 : 12,
      borderRadius: 30,
      ...centerStyle,
    },
    text: {
      color: color || colors.white,
      fontWeight: '700',
    },
    outlineText: {
      color: color || btnColor,
      fontWeight: '700',
    },
    icon: {
      marginRight: 5,
    },
    disabled: {
      backgroundColor: '#FFF',
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: 99999999,
      opacity: 0.2,
    }
  });
};

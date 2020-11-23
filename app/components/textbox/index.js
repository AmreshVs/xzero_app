import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from 'constants/colors';

export default function Textbox({
  style,
  outlined,
  placeholder,
  text,
  icon,
  onBlur,
  marginTop = 20,
  iconColor = '#CCC',
  ...args
}) {
  const styles = dynamicStyles(args);
  const [focus, setFocus] = useState(false);

  const handleBlur = () => {
    onBlur ? onBlur() : null;
    setFocus(false);
  };

  let textboxStyle = outlined ? styles.outlined : focus ? styles.textboxFocus : styles.textbox;
  textboxStyle = { ...textboxStyle, marginTop: marginTop };

  return (
    <>
      {text ? <Text style={styles.text}>{text}</Text> : null}
      <View style={[textboxStyle, style]}>
        {icon && (
          <FontAwesomeIcon
            style={styles.icon}
            icon={icon}
            color={focus ? colors.primary : iconColor}
          />
        )}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder || ''}
          onFocus={() => setFocus(true)}
          onBlur={handleBlur}
          {...args}
        />
      </View>
    </>
  );
}

const textboxStyle = (multiline) => {
  return {
    height: 50,
    width: '100%',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    display: 'flex',
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
  }
};

const dynamicStyles = ({ multiline }) => StyleSheet.create({
  textbox: {
    ...textboxStyle(multiline),
    backgroundColor: '#F9F9F9',
  },
  textboxFocus: {
    ...textboxStyle(multiline),
    backgroundColor: '#f9f9f9',
    borderColor: colors.primary,
  },
  outlined: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    width: '100%',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 10,
  },
  icon: {
    marginLeft: 15,
    marginRight: -10,
    marginTop: multiline ? 10 : 0
  },
  textInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    paddingTop: multiline ? 10 : 0,
    borderRadius: 50,
  },
});

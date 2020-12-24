import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from 'components/card';
import styles from './styles';
import { memo } from 'react';

const Note = ({ data }) => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Card style={styles.noteContainer}>
      <Text style={styles.noteText}>{data?.[`text_${language}`]}</Text>
    </Card>
  );
}

export default memo(Note);
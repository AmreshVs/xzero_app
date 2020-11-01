import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, FlatList } from 'react-native';

import colors from 'constants/colors';

export default function Dropdown({ data, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  selected = selected === '' || selected === null ? 'Choose' : selected;

  const dropdownItem = (item) => {
    onSelect(item);
    setOpen(false);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight
        underlayColor="#f5f5f5"
        activeOpacity={0.95}
        onPress={() => dropdownItem(item)}
        key={index}
      >
        <Text style={styles.contentItem}>{item.name}</Text>
      </TouchableHighlight>
    );
  };

  const seperator = () => {
    return <View style={styles.seperator} />;
  };

  return (
    <View style={styles.rootContainer}>
      <TouchableHighlight
        underlayColor="#EEE"
        activeOpacity={0.9}
        style={styles.container}
        onPress={() => setOpen(!open)}
      >
        <View style={styles.selectContainer}>
          <Text>{selected}</Text>
          <Text style={styles.icon}>{'>'}</Text>
        </View>
      </TouchableHighlight>
      {open && (
        <FlatList
          style={styles.contentContainer}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          initialNumToRender={5}
          ItemSeparatorComponent={seperator}
          removeClippedSubviews={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    position: 'relative',
    width: '100%',
  },
  container: {},
  selectContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: colors.primary,
    borderBottomWidth: 2,
  },
  contentContainer: {
    position: 'absolute',
    marginTop: 45,
    width: '100%',
    maxHeight: 201,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  contentItem: {
    padding: 15,
  },
  seperator: {
    height: 1,
    backgroundColor: '#EEE',
    marginHorizontal: 10,
  },
  icon: {
    fontSize: 18,
  },
});

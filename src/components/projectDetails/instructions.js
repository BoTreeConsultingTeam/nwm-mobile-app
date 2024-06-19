import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import CheckCircleIcon from '../../assets/icons/checkCircle.svg';
import {colors, fontFaces, fontSizes} from '../../styles';

const Instructions = ({title, instructionList}) => {
  const renderItem = item => {
    return (
      <View style={styles.instructionItem}>
        <CheckCircleIcon style={styles.checkIcon} />
        <Text style={styles.instructionText}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        contentContainerStyle={styles.listStyle}
        data={instructionList}
        renderItem={({item}) => renderItem(item)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  listStyle: {
    paddingRight: 10,
    marginRight: 10,
    marginTop: 10,
    // backgroundColor: 'red',
  },
  title: {
    fontSize: fontSizes.size16,
    ...fontFaces.regular.medium,
    color: colors.textNormal,
    marginBottom: 10,
  },
  checkIcon: {
    paddingTop: 10,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionText: {
    color: colors.textNormal,
    fontSize: fontSizes.size16,
    ...fontFaces.regular.normal,
    paddingLeft: 10,
    marginTop: -5,
  },
});
export default Instructions;
